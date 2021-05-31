const axios = require('axios');
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
            console.error('[ERROR]: ', error);
            this.data.photos = fallbackData.photos;
        }
    }

    async getSuperhostStatus() {
        try {
            const { hostId } = await Property.findByPk(this.id);
            const { data } = await axios.get(`${process.env.HOSTEDBY_DOMAIN}/api/hostedbyService/superhost/${hostId}`);

            this.data.isSuperhost = data;
        } catch (error) {
            console.error('[ERROR]: ', error);
            this.data.isSuperhost = fallbackData.isSuperhost;
        }
    }

    async getData() {
        await this.getPhotos();
        await this.getSuperhostStatus();
        return this.data;
    }
};
