const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = [
    '/api/photo-header/:roomNumber',
    createProxyMiddleware({
        // target: process.env.PROPERTIES_API,
        target: process.env.GET_DATA_API,
    }),
];
