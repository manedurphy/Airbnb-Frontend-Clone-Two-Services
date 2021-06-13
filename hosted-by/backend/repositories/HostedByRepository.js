const Host = require('../models/Host');
const CoHost = require('../models/Cohost');
const HostedBy = require('../models/HostedBy');

class HostedByRepository {
    constructor(data) {
        this.data = data;
    }

    async createHostedByRecord() {
        const hostedByRecord = await HostedBy.create(this.data);
        const coHostEmails = this.data.coHosts;

        for (let i = 0; i < coHostEmails.length; i++) {
            const coHost = await Host.findOne({ where: { email: coHostEmails[i] } });

            if (coHost) {
                await CoHost.create({
                    HostId: coHost.getDataValue('id'),
                    HostedById: hostedByRecord.getDataValue('id'),
                });
            }
        }
    }
}

module.exports = HostedByRepository;
