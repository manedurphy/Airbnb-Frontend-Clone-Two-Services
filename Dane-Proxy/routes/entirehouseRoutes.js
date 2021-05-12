const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = [
    '/propertyDetails',
    createProxyMiddleware({
        target: process.env.ENTIRE_HOUSE_DOMAIN,
    }),
];
