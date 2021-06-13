const { HostLanguage } = require('../../models');

module.exports = (async function () {
    await HostLanguage.sync({ force: true });
    for (let i = 0; i < 100; i++) {
        await HostLanguage.create({
            HostId: Math.floor(Math.random() * 100),
            LanguageId: 1 + Math.floor(Math.random() * 8),
        });
    }
})();
