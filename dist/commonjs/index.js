'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.display = display;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

require('core-js/es6/object');

var _rendererConfigDefaults = require('./rendererConfigDefaults');

var _rendererConfigDefaults2 = _interopRequireDefault(_rendererConfigDefaults);

var _opinion = require('./opinion');

var _opinion2 = _interopRequireDefault(_opinion);

var _fgLoadcss = require('fg-loadcss');

var _resourcesOnloadCSS = require('./resources/onloadCSS');

var _resourcesOnloadCSS2 = _interopRequireDefault(_resourcesOnloadCSS);

var _resourcesSizeObserver = require('./resources/SizeObserver');

var _resourcesSizeObserver2 = _interopRequireDefault(_resourcesSizeObserver);

var sizeObserver = new _resourcesSizeObserver2['default']();

var stylesLoaded = false;

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
    new _opinion2['default'](element, item);
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
          rendererConfig = Object.assign(_rendererConfigDefaults2['default'], rendererConfig);
        } else {
          rendererConfig = _rendererConfigDefaults2['default'];
        }

        var graphic = undefined;

        var rendererPromises = [];

        if (rendererConfig.loadStyles && stylesLoaded === false) {
          (function () {
            var themeUrl = rendererConfig.themeUrl || rendererConfig.rendererBaseUrl + 'themes/' + rendererConfig.theme;
            var themeLoadCSS = (0, _fgLoadcss.loadCSS)(themeUrl + '/styles.css');
            var themeLoadPromise = new Promise(function (resolve, reject) {
              (0, _resourcesOnloadCSS2['default'])(themeLoadCSS, function () {
                resolve();
              });
            });

            var sophieStylesLoad = (0, _fgLoadcss.loadCSS)('https://service.sophie.nzz.ch/bundle/sophie-q@~0.1.1,sophie-font@0.1.0,sophie-color@~0.1.0[color+background],sophie-input@~0.1.0[range].css');
            var sophieStylesLoadPromise = new Promise(function (resolve, reject) {
              (0, _resourcesOnloadCSS2['default'])(sophieStylesLoad, function () {
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