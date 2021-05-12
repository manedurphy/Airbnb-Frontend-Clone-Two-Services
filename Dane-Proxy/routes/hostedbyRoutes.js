const { createProxyMiddleware } = require('http-proxy-middleware');
const { hostedbyCache } = require('../middleware/hostedbyCache');
const client = require('../constants/client');

module.exports = [
    '/api/hostedbyService/:propertyId',
    hostedbyCache,
    createProxyMiddleware({
        target: `http://${process.env.HOSTEDBY_DOMAIN}`,
        onProxyRes: (proxyRes, req, res) => {
            const { propertyId } = req.params;
            proxyRes.on('data', (data) => {
                if (res.statusCode < 400) {
                    const cacheData = data.toString();
                    client.setex(`hostedby${propertyId}`, 3600, cacheData);
                }
            });
        },
    }),
];
