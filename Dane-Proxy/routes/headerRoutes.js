// const client = require('../constants/client');
const { createProxyMiddleware } = require('http-proxy-middleware');
// const { headerCache } = require('../middleware/headerCache');

module.exports = [
    '/api/headerService/:propertyId',
    createProxyMiddleware({
        target: process.env.HEADER_DOMAIN,
        // onProxyRes: (proxyRes, req, res) => {
        //     const { propertyId } = req.params;
        //     proxyRes.on('data', (data) => {
        //         if (res.statusCode < 400) {
        //             const cacheData = data.toString();
        //             client.setex(`header${propertyId}`, 3600, cacheData);
        //         }
        //     });
        // },
    }),
];
