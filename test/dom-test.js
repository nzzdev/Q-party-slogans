const JsDom = require('jsdom');
const JsonSchemaFaker = require('json-schema-faker');
const schema = require('../resources/schema.json');
const expect = require('chai').expect;

// would be nice to do it with json schema faker, but apparently for object "data" 
// the required status is ignored :/
const mockData = require('./resources/mock-data');
require('svelte/ssr/register');
const staticTpl = require('../views/HtmlStatic.html');
var markup = staticTpl.render(mockData);


function element(selector) {
  return new Promise((resolve, reject) => {
    JsDom.env(
      markup,
      (err, window) => {
        resolve(window.document.querySelector(selector));
      })
  })
}

function elementCount(selector) {
  return new Promise((resolve, reject) => {
    JsDom.env(
      markup,
      (err, window) => {
        resolve(window.document.querySelectorAll(selector).length);
      })
  })
}

// basic tests, could be extended in dependence of mock data
describe('Q party paroles markup check', function() {
  it('should pass if 3 level 1 DOM elements are found', function() {
    return elementCount('div.q-party-slogans-label--level1').then(value => {
      expect(value).to.be.equal(3);
    })
  })

  it('should not render level--2 with only one empty string', function() {
    return elementCount('div.q-party-slogans-label--level2').then(value => {
      expect(value).to.be.at.equal(5);
    })
  })

  it('should pass if not level 3 DOM element are found', function() {
    return elementCount('div.q-party-slogans-label--level3').then(value => {
      expect(value).to.be.equal(0);
    })
  })

  it('should pass if level 1 DOM element is found', function() {
    return element('.s-q-item__title').then(element => {
      expect(element.innerHTML).to.be.equal('nisi est');
    })
  })

  it('should not render empty parties or organisations', function() {
    return elementCount('.q-party-slogans-position:first-of-type .q-party-slogans-voices:nth-child(2) .q-party-slogans-voice').then(value => {
      expect(value).to.be.equal(1);
    })
  })
})

