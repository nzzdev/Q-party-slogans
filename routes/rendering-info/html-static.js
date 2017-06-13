const Joi = require('joi');
const Enjoi = require('enjoi');
const fs = require('fs');
const resourcesDir = __dirname + '/../../resources/';
const viewsDir     = __dirname + '/../../views/';

const schemaString = JSON.parse(fs.readFileSync(resourcesDir + 'schema.json', { encoding: 'utf-8'}));
const schema = Enjoi(schemaString);

require('svelte/ssr/register');
const staticTpl = require(`${viewsDir}/HtmlStatic.html`);

module.exports = {
  method: 'POST',
  path:'/rendering-info/html-static',
  config: {
    validate: {
      options: {
        allowUnknown: true
      },
      payload: {
        item: schema,
        toolRuntimeConfig: Joi.object()
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
