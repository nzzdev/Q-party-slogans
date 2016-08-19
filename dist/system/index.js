System.register(['core-js/es6/object', './rendererConfigDefaults', './resources/PartySlogans', 'fg-loadcss', './resources/onloadCSS'], function (_export) {
  'use strict';

  var rendererConfigDefaults, PartySlogans, loadCSS, onloadCSS, stylesLoaded;

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

  function getContextHtml(item, hideTitle) {
    var html = '';
    if (!hideTitle) {
      html += '<h3 class="s-q-item__title">' + wrapEmojisInSpan(item.title) + '</h3>';
    }
    html += '<div class="q-item-container"></div>';
    return html;
  }

  function displayWithContext(item, element, drawSize, hideTitle) {
    var el = document.createElement('section');
    el.setAttribute('class', 'q-party-slogans-item');
    el.innerHTML = getContextHtml(item, hideTitle);
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
    element.appendChild(el);

    return render(item, el.querySelector('.q-item-container'), drawSize);
  }

  function displayWithoutContext(item, element, drawSize) {
    element.setAttribute('class', 'q-party-slogans-item');
    return render(item, element, drawSize);
  }

  function render(item, element, drawSize) {
    return new Promise(function (resolve, reject) {
      var partySlogans = new PartySlogans(item);
      partySlogans.render(element, drawSize);
      resolve();
    });
  }

  function display(item, element, rendererConfig) {
    var withoutContext = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

    var hideTitle = rendererConfig.hideTitle === true;

    return new Promise(function (resolve, reject) {

      try {
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

            var sophieStylesLoad = loadCSS('https://service.sophie.nzz.ch/bundle/sophie-q@~0.1.1,sophie-font@^0.1.0,sophie-color@~1.0.0,sophie-viz-color@^1.0.0[diverging-6].css');
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

        try {
          if (withoutContext) {
            graphic = displayWithoutContext(item, element);
          } else {
            graphic = displayWithContext(item, element, hideTitle);
          }
          resolve({
            graphic: graphic,
            promises: rendererPromises
          });
        } catch (e) {
          reject(e);
        }
      } catch (e) {
        reject(e);
      }
    });
  }

  return {
    setters: [function (_coreJsEs6Object) {}, function (_rendererConfigDefaults) {
      rendererConfigDefaults = _rendererConfigDefaults['default'];
    }, function (_resourcesPartySlogans) {
      PartySlogans = _resourcesPartySlogans['default'];
    }, function (_fgLoadcss) {
      loadCSS = _fgLoadcss.loadCSS;
    }, function (_resourcesOnloadCSS) {
      onloadCSS = _resourcesOnloadCSS['default'];
    }],
    execute: function () {
      stylesLoaded = false;
    }
  };
});