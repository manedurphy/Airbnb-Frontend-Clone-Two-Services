const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = [
    '/api/properties/:roomNumber',
    createProxyMiddleware({
        target: process.env.PROPERTIES_API,
    }),
];
