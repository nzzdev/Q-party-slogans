const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const schema = require('../resources/schema.json');
const expect = require('chai').expect;

require('svelte/ssr/register');
const staticTpl = require('../views/HtmlStatic.html');

const mockDataOnlyYes = require('../resources/fixtures/data/only-yes.js');
const markupOnlyYes = staticTpl.render(mockDataOnlyYes);

console.log(markupOnlyYes);


function element(selector) {
  return new Promise((resolve, reject) => {
    const dom = new JSDOM(markupOnlyYes);
    resolve(dom.window.document.querySelector(selector));
  })
}

function elementCount(selector) {
  return new Promise((resolve, reject) => {
    const dom = new JSDOM(markupOnlyYes);
    resolve(dom.window.document.querySelectorAll(selector).length);
  })
}

// basic tests, could be extended in dependence of mock data
describe('Q party slogans markup check with only yes position', () => {
  it('should pass if one level-1 DOM element is found, i.e. only yes section', () => {
    return elementCount('div.q-party-slogans-label--level1').then(value => {
      expect(value).to.be.equal(1);
    })
  })

  it('should pass if two level-2 DOM elements are found, i.e. parties and organisations in yes section', () => {
    return elementCount('div.q-party-slogans-label--level2').then(value => {
      expect(value).to.be.at.equal(2);
    })
  })

  it('should pass if no level-3 DOM elements are found', () => {
    return elementCount('div.q-party-slogans-label--level3').then(value => {
      expect(value).to.be.equal(0);
    })
  })
})

