const sass = require('node-sass');
const Boom = require('boom');
const path = require('path');

const stylesDir = __dirname + '/../styles/'

module.exports = {
  method: 'GET',
  path: '/stylesheet/{name*}',
  handler: function(request, reply) {
    sass.render(
      {
        file: stylesDir + `${request.params.name}.scss`,
        outputStyle: 'compressed'
      }, 
      (err, result) => {
        if (err) {
          reply(Boom.badImplementation(err));
        } else {
          reply(result.css)
        }
      }
    )
  }
}
