const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = [
    '/morePlaces',
    createProxyMiddleware({
        target: `http://${process.env.MORE_PLACES_DOMAIN}`,
    }),
];
