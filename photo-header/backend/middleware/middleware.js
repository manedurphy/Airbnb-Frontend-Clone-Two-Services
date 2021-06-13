exports.validateProperty = function (req, res, next) {
    if (!req.body.hostId) {
        res.status(400).json({ message: 'Must include the host ID' });
        return;
    }

    if (!req.body.title) {
        res.status(400).json({ message: 'Must include a title' });
        return;
    }

    next();
};

exports.validatePhotos = function (req, res, next) {
    for (let i = 0; i < req.body.length; i++) {
        if (!req.body[i].link) {
            res.status(400).json({ message: 'Must include a link' });
            return;
        }

        if (!req.body[i].description) {
            res.status(400).json({ message: 'Must include a description' });
            return;
        }

        if (!req.body[i].PropertyId) {
            res.status(400).json({ message: 'Must include a property ID' });
            return;
        }

        if (i === 0) {
            req.body[i].isMain = true;
        }
    }

    next();
};
