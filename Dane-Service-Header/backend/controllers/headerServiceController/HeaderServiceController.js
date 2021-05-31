const router = require('express').Router();
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

        const headerData = await repo.getData();
        res.status(200).json(headerData);
    } catch (error) {
        console.error('[ERROR]: ', error);
        res.status(500).json(new Response(responses.serverError));
    }
});

module.exports = router;
