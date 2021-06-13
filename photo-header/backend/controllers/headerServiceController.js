const router = require('express').Router();
const readClient = require('../redis/readClient');
const writeClient = require('../redis/writeClient');
const responses = require('../constants/routeResponses');
const Response = require('../constants/Response');
const ServiceRepository = require('../repositories/ServiceRepo');
const { validateProperty, validatePhotos } = require('../middleware/middleware');

router.get('/:propertyId', async (req, res) => {
    const { propertyId } = req.params;
    const repo = new ServiceRepository(propertyId);
    try {
        if (propertyId > 100) {
            res.status(404).json(new Response(responses.noHeaderData));
            return;
        }

        readClient.get(`header${propertyId}`, async (_, data) => {
            if (!data) {
                const headerData = await repo.getData();
                writeClient.setex(`header${propertyId}`, 3600, JSON.stringify(headerData));
                res.status(200).json(headerData);
            } else {
                console.log('Retrieved data from Redis store!');
                res.status(200).json(JSON.parse(data));
            }
        });
    } catch (error) {
        console.error('[ERROR]', error);
        res.status(500).json(new Response(responses.serverError));
    }
});

router.post('/property', validateProperty, async (req, res) => {
    const repo = new ServiceRepository(-1);
    try {
        const property = await repo.createProperty(req.body);
        res.status(201).json(property);
    } catch (error) {
        console.error('[ERROR]', error);
        res.status(500).json(new Response(responses.serverError));
    }
});

router.post('/photos', validatePhotos, async (req, res) => {
    const repo = new ServiceRepository(-1);
    try {
        await repo.createPhotos(req.body);
        res.status(201).json(new Response(responses.createPhotosSuccess));
    } catch (error) {
        console.error('[ERROR]', error);
        res.status(500).json(new Response(responses.serverError));
    }
});

module.exports = router;
