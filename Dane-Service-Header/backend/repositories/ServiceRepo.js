const axios = require('axios');
const fallbackData = require('../data/fallbackData');
const Photo = require('../models/Photo');
const Property = require('../models/Property');

module.exports = class ServiceRepository {
    constructor(id) {
        this.id = id;
        this.data = {
            photos: [],
            location: {},
            reviews: {},
            isSuperhost: false,
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

    async getLocation() {
        try {
            const { data } = await axios.get(
                `http://${process.env.MAP_DOMAIN}/location/${this.id}`
            );

            this.data.location = { ...data };
        } catch (error) {
            this.data.location = fallbackData.location;
        }
    }

    async getReviews() {
        try {
            const { data } = await axios.get(
                `http://${process.env.REVIEWS_DOMAIN}/reviews/header/${this.id}`
            );

            this.data.reviews = { ...data };
        } catch (error) {
            this.data.reviews = fallbackData.reviews;
        }
    }

    async getSuperhostStatus() {
        try {
            const { hostId } = await Property.findByPk(this.id);
            const { data } = await axios.get(
                `http://${process.env.HOSTEDBY_DOMAIN}/api/hostedbyService/superhost/${hostId}`
            );

            this.data.isSuperhost = data;
        } catch (error) {
            this.data.isSuperhost = fallbackData.isSuperhost;
        }
    }

    async getData() {
        await this.getPhotos();
        await this.getLocation();
        await this.getReviews();
        await this.getSuperhostStatus();
        return this.data;
    }
};
