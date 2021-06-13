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

    formatData() {
        const formattedData = {
            cohosts: [],
            duringYourStay: this.data.duringYourStay,
            host: {
                firstName: this.data.Host.name,
                avatar: this.data.Host.avatar,
                about: this.data.Host.about,
                identityVerified: this.data.Host.identityVerified,
                isSuperhost: this.data.Host.isSuperhost,
                languages: this.data.Host.HostLanguages.map((language) => {
                    return {
                        name: language.Language.name,
                    };
                }),

                joinedOn: this.data.Host.joinedOn,
                responseTime: this.data.responseTime,
                responseRate: this.data.responseRate,
            },
        };

        this.data.CoHosts.forEach((cohost) =>
            formattedData.cohosts.push({
                firstName: cohost.Host.name,
                avatar: cohost.Host.avatar,
            }),
        );

        return formattedData;
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
        return this.formatData();
    }
};
