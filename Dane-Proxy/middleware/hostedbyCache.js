const client = require('../constants/client');

module.exports.hostedbyCache = (req, res, next) => {
    const key = `hostedby${req.params.propertyId}`;
    client.get(key, (_err, data) => {
        if (data != null) {
            return res.status(200).send(data);
        }
        next();
    });
};
