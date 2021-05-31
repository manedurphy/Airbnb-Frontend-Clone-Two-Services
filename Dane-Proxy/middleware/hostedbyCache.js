const client = require('../constants/client');

module.exports.hostedbyCache = (req, res, next) => {
    const key = `hostedby${req.params.propertyId}`;
    client.get(key, (_err, data) => {
        if (data != null) {
            console.log('Retrieved data from Redis store!');
            return res.status(200).send(data);
        }
        next();
    });
};
