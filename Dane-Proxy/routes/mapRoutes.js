const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = [
    '/map',
    createProxyMiddleware({
        target: `http://${process.env.MAP_DOMAIN}`,
    }),
];
