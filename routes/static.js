const Joi = require('joi');

require('svelte/ssr/register');
const staticTpl = require('../views/static.html');


module.exports = {
  method: 'POST',
  path:'/static',
  config: {
    validate: {
      payload: Joi.object()
    },
  },
  handler: function(request, reply) {
    let data = {
      stylesheets: [
        {
          url: 'https://service.sophie.nzz.ch/bundle/sophie-q@~0.1.1,sophie-font@^0.1.0,sophie-color@~1.0.0,sophie-viz-color@^1.0.0[diverging-6].css',
          type: 'critical'
        },
        {
          rendererStyle: 'default'
        }
      ],
      markup: staticTpl.render(request.payload.item)
    }
    return reply(data)
  }
}
