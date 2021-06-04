const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = [
    '/api/hosts/hosted-by/:roomNumber',
    createProxyMiddleware({
        target: process.env.HOSTS_API,
    }),
];
