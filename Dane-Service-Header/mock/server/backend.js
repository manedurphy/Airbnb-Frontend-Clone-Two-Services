const { setupServer } = require('msw/node');
const { handlers } = require('../handlers/backend');

module.exports.server = setupServer(...handlers);
