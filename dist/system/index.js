System.register(['core-js/es6/object', './rendererConfigDefaults', './opinion', 'fg-loadcss', './resources/onloadCSS', './resources/SizeObserver'], function (_export) {
  'use strict';

  var rendererConfigDefaults, Opinion, loadCSS, onloadCSS, SizeObserver, sizeObserver, stylesLoaded;

  _export('display', display);

  function wrapEmojisInSpan(text) {
    text = text.replace(/([\ud800-\udbff])([\udc00-\udfff])/g, '<span class="emoji">$&</span>');
    return text;
  }

  function getElementSize(rect) {
    var size = 'small';
    if (rect.width && rect.width > 480) {
      size = 'large';
    } else {
      size = 'small';
    }
    return size;
  }

  function getContextHtml(item) {
    var html = '';
    if (!item.options || !item.options.hideTitle) {
      html += '<h3 class="q-item__title">' + wrapEmojisInSpan(item.title) + '</h3>';
    }
    html += '<div class="q-item-container"></div>';

    return html;
  }

  function displayWithContext(item, element) {
    var el = document.createElement('section');
    el.setAttribute('class', 'q-party-parole-item');
    el.innerHTML = getContextHtml(item);
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
    element.appendChild(el);

    return render(item, el.querySelector('.q-item-container'));
  }

  function displayWithoutContext(item, element) {
    element.setAttribute('class', 'q-party-parole-item');
    return render(item, element);
  }

  function render(item, element) {
    return new Promise(function (resolve, reject) {
      new Opinion(element, item);
      resolve();
    });
  }

  function display(item, element, rendererConfig) {
    var withoutContext = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

    return new Promise(function (resolve, reject) {
      try {
        (function () {
          if (!element) throw 'Element is not defined';

          if (rendererConfig && typeof rendererConfig === 'object') {
            rendererConfig = Object.assign(rendererConfigDefaults, rendererConfig);
          } else {
            rendererConfig = rendererConfigDefaults;
          }

          var graphic = undefined;

          var rendererPromises = [];

          if (rendererConfig.loadStyles && stylesLoaded === false) {
            (function () {
              var themeUrl = rendererConfig.themeUrl || rendererConfig.rendererBaseUrl + 'themes/' + rendererConfig.theme;
              var themeLoadCSS = loadCSS(themeUrl + '/styles.css');
              var themeLoadPromise = new Promise(function (resolve, reject) {
                onloadCSS(themeLoadCSS, function () {
                  resolve();
                });
              });

              var sophieStylesLoad = loadCSS('https://service.sophie.nzz.ch/bundle/sophie-q@~0.1.1,sophie-font@0.1.0,sophie-color@~0.1.0[color+background],sophie-input@~0.1.0[range].css');
              var sophieStylesLoadPromise = new Promise(function (resolve, reject) {
                onloadCSS(sophieStylesLoad, function () {
                  resolve();
                });
              });

              Promise.all([themeLoadPromise, sophieStylesLoadPromise]).then(function (styles) {
                stylesLoaded = true;
              });

              rendererPromises.push(themeLoadPromise);
              rendererPromises.push(sophieStylesLoadPromise);
            })();
          }

          sizeObserver.onResize(function (rect) {
            var drawSize = getElementSize(rect);

            try {
              if (withoutContext) {
                graphic = displayWithoutContext(item, element, drawSize);
              } else {
                graphic = displayWithContext(item, element, drawSize);
              }
            } catch (e) {
              reject(e);
            }

            resolve({
              graphic: graphic,
              promises: rendererPromises
            });
          }, element, true);
        })();
      } catch (e) {
        reject(e);
      }
    });
  }

  return {
    setters: [function (_coreJsEs6Object) {}, function (_rendererConfigDefaults) {
      rendererConfigDefaults = _rendererConfigDefaults['default'];
    }, function (_opinion) {
      Opinion = _opinion['default'];
    }, function (_fgLoadcss) {
      loadCSS = _fgLoadcss.loadCSS;
    }, function (_resourcesOnloadCSS) {
      onloadCSS = _resourcesOnloadCSS['default'];
    }, function (_resourcesSizeObserver) {
      SizeObserver = _resourcesSizeObserver['default'];
    }],
    execute: function () {
      sizeObserver = new SizeObserver();
      stylesLoaded = false;
    }
  };
});