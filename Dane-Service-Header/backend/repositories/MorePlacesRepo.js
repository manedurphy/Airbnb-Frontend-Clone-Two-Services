const axios = require('axios');
const Property = require('../models/Property');
const Photo = require('../models/Photo');

module.exports = class MorePlacesRepository {
    constructor(id) {
        this.id = id;
        this.dataLoaded = true;
        this.data = {
            title: '',
            photo: '',
            isSuperhost: false,
        };
    }

    async getReviewsInfo() {
        const { title, hostId } = await Property.findByPk(this.id);
        const { data } = await axios.get(
            `http://${process.env.HOSTEDBY_DOMAIN}/api/hostedbyService/superhost/${hostId}`
        );

        this.data.title = title;
        this.data.isSuperhost = data;
    }

    async getFirstPhoto() {
        const mainPhoto = await Photo.findOne({
            where: { Propertyid: this.id, isMain: true },
            attributes: ['link'],
        });

        this.data.photo = mainPhoto.link;
    }

    async getData() {
        try {
            await this.getReviewsInfo();
            await this.getFirstPhoto();
            return this.data;
        } catch (error) {
            this.dataLoaded = false;
        }
    }
};
