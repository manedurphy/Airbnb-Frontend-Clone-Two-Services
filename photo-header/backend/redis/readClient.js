module.exports = require('redis').createClient({ url: process.env.REDIS_READ_URL });
