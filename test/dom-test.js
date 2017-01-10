const JsDom = require('jsdom');
const Fetch = require('node-fetch');
const JsonSchemaFaker = require('json-schema-faker');
const schema = require('../resources/schema.json');
const Expect = require('chai').expect;

// would be nice to do it with json schema faker, but apparently for object "data" 
// the required status is ignored :/
const mockData = require('./resources/mock-data');
require('svelte/ssr/register');
const staticTpl = require('../views/static.html');
var markup = staticTpl.render(mockData);

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
    it('should pass if level 1 DOM element is found', function() {
        return elementCount('div.q-party-slogans-label--level1').then(value => {
            Expect(value).to.be.equal(3);
        })
    })
})

describe('Q party paroles markup check', function() {
    it('should pass if level 1 DOM element is found', function() {
        return elementCount('div.q-party-slogans-label--level2').then(value => {
            Expect(value).to.be.at.least(1);
        })
    })
})

describe('Q party paroles markup check', function() {
    it('should pass if level 1 DOM element is found', function() {
        return elementCount('div.q-party-slogans-label--level3').then(value => {
            Expect(value).to.be.equal(0);
        })
    })
})


