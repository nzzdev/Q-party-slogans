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

var promise = new Promise(function(resolve, reject) {
    let found = false;
    JsDom.env(
        markup,
        ["http://code.jquery.com/jquery.js"],
        (err, window) => {
            if (window.$('div.q-party-slogans-label--level1').length >= 1) {
                found = true;
            }    
            resolve(found);
    })
});

describe('Q party paroles markup check', function() {
    it('should pass if level 1 DOM element is found', function() {
        return promise.then(value => {
            Expect(value).to.be.true;
        })
    })
})


