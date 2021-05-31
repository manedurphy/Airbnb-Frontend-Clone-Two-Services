// const axios = require('axios');
const fallbackData = require('../data/fallbackData');
const Photo = require('../models/Photo');
const Property = require('../models/Property');

module.exports = class ServiceRepository {
    constructor(id) {
        this.id = id;
        this.data = {
            photos: [],
            isSuperhost: fallbackData.isSuperhost,
            location: fallbackData.location,
            reviews: fallbackData.reviews,
        };
    }

    async getPhotos() {
        try {
            const photos = await Photo.findAll({
                where: { PropertyId: this.id },
                include: [{ model: Property }],
            });

            this.data.photos = photos;
        } catch (error) {
            this.data.photos = fallbackData.photos;
        }
    }

    async getData() {
        await this.getPhotos();
        return this.data;
    }
};
