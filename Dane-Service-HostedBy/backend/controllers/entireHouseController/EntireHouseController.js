const router = require('express').Router();
const responses = require('../../constants/routeResponses');
const Response = require('../../constants/Response');
const EntireHouseRepository = require('../../repositories/EntireHouseRepo');

router.get('/entire-house/:propertyId', async (req, res) => {
    const { propertyId } = req.params;
    const repo = new EntireHouseRepository(propertyId);
    try {
        const hostInfo = await repo.getData();

        if (!hostInfo)
            return res.status(404).json(new Response(responses.entireHouse));

        const { name, avatar, isSuperhost } = hostInfo;
        return res.status(200).json({ name, avatar, isSuperhost });
    } catch (error) {
        return res.status(500).json(new Response(responses.serverError));
    }
});

module.exports = router;
