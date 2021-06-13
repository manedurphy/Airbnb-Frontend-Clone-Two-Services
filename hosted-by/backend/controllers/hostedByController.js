const router = require('express').Router();
const readClient = require('../redis/readClient');
const writeClient = require('../redis/writeClient');
const responses = require('../constants/routeResponses');
const Host = require('../models/Host');
const Response = require('../constants/Response');
const ServiceRepository = require('../repositories/ServiceRepository');
const HostRepository = require('../repositories/HostRepository');
const HostedByRepository = require('../repositories/HostedByRepository');

router.get('/:propertyId', async (req, res) => {
    const { propertyId } = req.params;
    const repo = new ServiceRepository(propertyId);
    try {
        if (propertyId > 100) {
            res.status(404).json(new Response(responses.notFound));
            return;
        }

        readClient.get(`hostedby${propertyId}`, async (_, data) => {
            if (!data) {
                const hostedBy = await repo.getData();
                writeClient.setex(`hostedby${propertyId}`, 3600, JSON.stringify(hostedBy));
                res.status(200).json(hostedBy);
            } else {
                console.log('Retrieved data from Redis store!');
                res.status(200).json(JSON.parse(data));
            }
        });
    } catch (error) {
        console.error('[ERROR] ', error);
        res.status(500).json(new Response(responses.serverError));
    }
});

router.get('/superhost/:id', async (req, res) => {
    try {
        const host = await Host.findByPk(req.params.id);

        if (!host) {
            res.status(404).json(new Response(responses.hostNotFound));
            return;
        }

        res.status(200).send(host.isSuperhost);
    } catch (error) {
        console.error('[ERROR]', error);
        res.status(500).json(new Response(responses.serverError));
    }
});

router.post('/host', async (req, res) => {
    const repo = new HostRepository(req.body);
    try {
        const success = await repo.createHost();

        if (success) {
            res.status(201).json(new Response(responses.hostedCreated));
            return;
        }

        // res.status(400).json(new Response(responses.emailExists));
    } catch (error) {
        console.error('[ERROR]', error);
        res.status(500).json(new Response(responses.serverError));
    }
});

router.post('/hostedByRecord', async (req, res) => {
    const repo = new HostedByRepository(req.body);
    try {
        await repo.createHostedByRecord();
        res.status(201).json(new Response(responses.hostedbyCreated));
    } catch (error) {
        console.error('[ERROR]', error);
        res.status(500).json(new Response(responses.serverError));
    }
});

module.exports = router;