const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = [
    '/api/hosted-by/:roomNumber',
    createProxyMiddleware({
        // target: process.env.HOSTS_API,
        target: process.env.GET_DATA_API,
    }),
];
