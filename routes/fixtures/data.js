const fixtureDataDirectory = '../../resources/fixtures/data';

// provide every fixture data file present in ../../resources/fixtures/data
const fixtureData = [
  require(`${fixtureDataDirectory}/complete.js`),
  require(`${fixtureDataDirectory}/only-parties.js`),
  require(`${fixtureDataDirectory}/only-yes.js`)
];

module.exports = {
  path: '/fixtures/data',
  method: 'GET',
  options: {
    tags: ['api'],
    cors: true
  },
  handler: (request, h) => {
     return fixtureData;
  }
}
