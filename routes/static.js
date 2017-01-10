const Joi = require('joi');
const Enjoi = require('enjoi');
const fs = require('fs');
const resourcesDir = __dirname + '/../resources/';

const schemaString = JSON.parse(fs.readFileSync(resourcesDir + 'schema.json', { encoding: 'utf-8'}));
const schema = Enjoi(schemaString);

require('svelte/ssr/register');
const staticTpl = require('../views/static.html');

module.exports = {
  method: 'POST',
  path:'/static',
  config: {
    validate: {
      payload: {
        item: schema
      }
    },
  },
  handler: function(request, reply) {
    let data = {
      stylesheets: [
        {
          name: 'default',
          type: 'critical'
        }
      ],
      markup: staticTpl.render(request.payload.item)
    }
    return reply(data)
  }
}
