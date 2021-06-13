const Host = require('../models/Host');
const Language = require('../models/Language');
const HostLanguage = require('../models/HostLanguage');

class HostRepository {
    constructor(data) {
        this.data = data;
    }

    createLanguage(language) {
        return Language.create(language);
    }

    async createHost() {
        const existingHost = await Host.findOne({ where: { email: this.data.email } });

        if (!existingHost) {
            const host = await Host.create(this.data);
            const languages = this.data.languages;

            for (let i = 0; i < languages.length; i++) {
                let language = await Language.findOne({ where: { name: languages[i] } });

                if (!language) {
                    language = await this.createLanguage({ name: languages[i] });
                }

                await HostLanguage.create({
                    HostId: host.getDataValue('id'),
                    LanguageId: language.getDataValue('id'),
                });
            }

            return true;
        }

        return false;
    }
}

module.exports = HostRepository;
