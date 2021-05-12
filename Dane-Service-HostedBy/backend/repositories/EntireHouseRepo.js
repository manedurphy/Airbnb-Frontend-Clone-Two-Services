const Host = require('../models/Host');
const HostedBy = require('../models/HostedBy');

module.exports = class EntireHouseRepository {
    constructor(id) {
        this.id = id;
        this.dataLoaded = true;
        this.data = {
            name: '',
            avatar: '',
            isSuperhost: false,
        };
    }

    async getHostInfo() {
        const { HostId } = await HostedBy.findOne({
            where: { PropertyId: this.id },
        });

        const { dataValues } = await Host.findByPk(HostId, {
            attributes: ['name', 'avatar', 'isSuperhost'],
        });

        this.data = { ...dataValues };
    }

    async getData() {
        try {
            await this.getHostInfo();
            return this.data;
        } catch (error) {
            this.dataLoaded = false;
        }
    }
};
