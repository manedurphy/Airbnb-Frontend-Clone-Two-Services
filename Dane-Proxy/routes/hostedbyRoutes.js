const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = [
    '/api/hostedbyService/:propertyId',
    createProxyMiddleware({
        target: process.env.HOSTEDBY_DOMAIN,
    }),
];
