const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = [
    '/api/headerService/:propertyId',
    createProxyMiddleware({
        target: process.env.HEADER_DOMAIN,
    }),
];
