'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.display = display;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

require('core-js/es6/object');

var _rendererConfigDefaults = require('./rendererConfigDefaults');

var _rendererConfigDefaults2 = _interopRequireDefault(_rendererConfigDefaults);

var _resourcesPartySlogans = require('./resources/PartySlogans');

var _resourcesPartySlogans2 = _interopRequireDefault(_resourcesPartySlogans);

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
    var partySlogans = new _resourcesPartySlogans2['default'](item);
    partySlogans.render(element, drawSize);
    resolve();
  });
}

function display(item, element, rendererConfig) {
  var withoutContext = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

  var hideTitle = rendererConfig.hideTitle === true;

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

            var sophieStylesLoad = (0, _fgLoadcss.loadCSS)('https://service.sophie.nzz.ch/bundle/sophie-q@~0.1.1,sophie-font@^0.1.0,sophie-color@~1.0.0,sophie-viz-color@^1.0.0[diverging-6].css');
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

        var lastWidth = undefined;

        sizeObserver.onResize(function (rect) {
          if (rect.width && lastWidth === rect.width) {
            return;
          }
          lastWidth = rect.width;

          var drawSize = getElementSize(rect);

          try {
            if (withoutContext) {
              graphic = displayWithoutContext(item, element, drawSize);
            } else {
              graphic = displayWithContext(item, element, drawSize, hideTitle);
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