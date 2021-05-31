const router = require('express').Router();
const client = require('../../redis/client');
const responses = require('../../constants/routeResponses');
const Response = require('../../constants/Response');
const ServiceRepository = require('../../repositories/ServiceRepo');

router.get('/:propertyId', async (req, res) => {
    const { propertyId } = req.params;
    const repo = new ServiceRepository(propertyId);
    try {
        if (propertyId > 100) {
            res.status(404).json(new Response(responses.noHeaderData));
            return;
        }

        client.get(`header${propertyId}`, async (_, data) => {
            if (!data) {
                const headerData = await repo.getData();
                client.setex(`header${propertyId}`, 3600, JSON.stringify(headerData));
                res.status(200).json(headerData);
            } else {
                console.log('Retrieved data from Redis store!');
                res.status(200).json(data);
            }
        });
    } catch (error) {
        console.error('[ERROR] ', error);
        res.status(500).json(new Response(responses.serverError));
    }
});

module.exports = router;
