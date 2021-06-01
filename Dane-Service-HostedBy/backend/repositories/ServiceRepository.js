const Host = require('../models/Host');
const CoHost = require('../models/Cohost');
const HostedBy = require('../models/HostedBy');
const Language = require('../models/Language');
const HostLanguage = require('../models/HostLanguage');

module.exports = class ServiceRepository {
    constructor(id) {
        this.id = id;
        this.data = {};
    }

    async getHostedByInfo() {
        const hostedBy = await HostedBy.findOne({
            where: { PropertyId: this.id },
            include: [
                {
                    model: Host,
                    include: [
                        {
                            model: HostLanguage,
                            attributes: ['LanguageId'],
                            include: [
                                {
                                    model: Language,
                                    attributes: ['name'],
                                },
                            ],
                        },
                    ],
                },
                {
                    model: CoHost,
                    include: [
                        {
                            model: Host,
                            attributes: ['name', 'avatar'],
                        },
                    ],
                },
            ],
        });

        this.data = hostedBy;
    }

    async getData() {
        await this.getHostedByInfo();
        return this.data;
    }
};
