const sass = require('node-sass');
const Boom = require('boom');
const path = require('path');

const parentDir = __dirname + '/../styles/'
module.exports = {
  method: 'GET',
  path: '/styles/{path*}',
  handler: function(request, reply) {
    let result = sass.render({
      file: parentDir + `${request.params.path}.scss`,
      outputStyle: 'compressed'
    }, 
    (err, result) => {
      if (err) {
        reply(Boom.badImplementation(err));
      } else {
        reply(result.css)
      }
    })
  }
}
