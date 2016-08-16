import 'core-js/es6/object';

import rendererConfigDefaults from './rendererConfigDefaults';
import PartySlogans from './resources/PartySlogans';

import {loadCSS} from 'fg-loadcss';
import onloadCSS from './resources/onloadCSS';

import SizeObserver from './resources/SizeObserver';
var sizeObserver = new SizeObserver();

var stylesLoaded = false;

function wrapEmojisInSpan(text) {
  text = text.replace(
    /([\ud800-\udbff])([\udc00-\udfff])/g,
    '<span class="emoji">$&</span>');
  return text;
}

function getElementSize(rect) {
  let size = 'small';
  if (rect.width && rect.width > 480) {
    size = 'large';
  } else {
    size = 'small';
  }
  return size;
}

function getContextHtml(item, hideTitle) {
  let html = '';
  if (!hideTitle) {
    html += `<h3 class="s-q-item__title">${wrapEmojisInSpan(item.title)}</h3>`;
  }
  html += '<div class="q-item-container"></div>';
  return html;
}

function displayWithContext(item, element, drawSize, hideTitle) {
  let el = document.createElement('section');
  el.setAttribute('class','q-party-slogans-item');
  el.innerHTML = getContextHtml(item, hideTitle);
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  element.appendChild(el);

  return render(item, el.querySelector('.q-item-container'), drawSize);
}

function displayWithoutContext(item, element, drawSize) {
  element.setAttribute('class','q-party-slogans-item');
  return render(item, element, drawSize);
}

function render(item, element, drawSize) {
  return new Promise((resolve, reject) => {
    let partySlogans = new PartySlogans(item);
    partySlogans.render(element, drawSize)
    resolve();
  });
}

export function display(item, element, rendererConfig, withoutContext = false) {

  let hideTitle = rendererConfig.hideTitle === true;

  return new Promise((resolve, reject) => {

    try {
      if (!element) throw 'Element is not defined';

      if (rendererConfig && typeof rendererConfig === 'object') {
        rendererConfig = Object.assign(rendererConfigDefaults, rendererConfig);
      } else {
        rendererConfig = rendererConfigDefaults;
      }

      let graphic;

      let rendererPromises = [];

      if (rendererConfig.loadStyles && stylesLoaded === false) {
        let themeUrl = rendererConfig.themeUrl || `${rendererConfig.rendererBaseUrl}themes/${rendererConfig.theme}`;
        let themeLoadCSS = loadCSS(`${themeUrl}/styles.css`);
        let themeLoadPromise = new Promise((resolve, reject) => {
          onloadCSS(themeLoadCSS, () => {
            resolve();
          });
        });


        // additional styles
        let sophieStylesLoad = loadCSS('https://service.sophie.nzz.ch/bundle/sophie-q@~0.1.1,sophie-font@0.1.0,sophie-color@~0.1.0[color],sophie-viz-color@^1.0.0[diverging-6].css');
        let sophieStylesLoadPromise = new Promise((resolve, reject) => {
          onloadCSS(sophieStylesLoad, () => {
            resolve();
          });
        });

        Promise.all([themeLoadPromise, sophieStylesLoadPromise])
          .then(styles => {
            stylesLoaded = true;
          });

        rendererPromises.push(themeLoadPromise);
        rendererPromises.push(sophieStylesLoadPromise);
      }

      sizeObserver.onResize((rect) => {
        let drawSize = getElementSize(rect);

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

    } catch (e) {
      reject(e);
    }
  });
}
