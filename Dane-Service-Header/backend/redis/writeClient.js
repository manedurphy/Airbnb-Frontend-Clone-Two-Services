module.exports = require('redis').createClient({ url: process.env.REDIS_WRITE_URL });
