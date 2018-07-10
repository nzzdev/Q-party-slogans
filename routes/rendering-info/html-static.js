const Joi = require("joi");
const Enjoi = require("enjoi");
const fs = require("fs");
const resourcesDir = `${__dirname}/../../resources/`;
const viewsDir = `${__dirname}/../../views/`;

const styleHashMap = require(`${__dirname}/../../styles/hashMap.json`);

const schemaString = JSON.parse(
  fs.readFileSync(`${resourcesDir}schema.json`, { encoding: "utf-8" })
);
const schema = Enjoi(schemaString).required();

require("svelte/ssr/register");
const staticTpl = require(`${viewsDir}/HtmlStatic.html`);

module.exports = {
  method: "POST",
  path: "/rendering-info/html-static",
  options: {
    validate: {
      options: {
        allowUnknown: true
      },
      payload: {
        item: schema,
        toolRuntimeConfig: Joi.object()
      }
    },
    cache: false, // do not send cache control header to let it be added by Q Server
    cors: true
  },
  handler: function(request, h) {
    let data = {
      stylesheets: [
        {
          name: styleHashMap.default
        }
      ],
      markup: staticTpl.render(request.payload.item)
    };
    return data;
  }
};
