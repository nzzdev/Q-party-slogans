module.exports = {
  method: 'GET',
  path:'/schema.json',
  handler: function(request, reply) {
    reply.file('./resources/schema.json');
  }
}
