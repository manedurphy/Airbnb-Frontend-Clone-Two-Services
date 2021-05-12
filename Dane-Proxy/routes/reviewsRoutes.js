const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = [
    '/reviews',
    createProxyMiddleware({
        target: `http://${process.env.REVIEWS_DOMAIN}`,
    }),
];
