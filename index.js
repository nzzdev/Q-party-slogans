'use strict';

const Hapi = require('hapi');
const Path = require('path');
const Hoek = require('hoek');

const routes = require('./routes/routes.js');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({ 
  host: 'localhost', 
  port: 3000
});

server.register(require('vision'), err => {

  Hoek.assert(!err, err);

  // const staticTpl = require('./views/templates/static.marko');

  // Add the route
  server.route(routes);

  // Start the server
  server.start((err) => {

    Hoek.assert(!err, err);

    console.log('Server running at:', server.info.uri);
  });
});


