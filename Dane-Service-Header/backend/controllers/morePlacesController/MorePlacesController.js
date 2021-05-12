const router = require('express').Router();
const responses = require('../../constants/routeResponses');
const Response = require('../../constants/Response');
const MorePlacesRepository = require('../../repositories/MorePlacesRepo');

router.get('/more-places/:propertyId', async (req, res) => {
    const { propertyId } = req.params;
    const repo = new MorePlacesRepository(propertyId);
    try {
        const morePlacesInfo = await repo.getData();

        if (!repo.dataLoaded) return res.status(404).json(new Response(responses.noMorePlaces));

        return res.status(200).json(morePlacesInfo);
    } catch (error) {
        return res.status(500).json(new Response(responses.serverError));
    }
});

module.exports = router;
