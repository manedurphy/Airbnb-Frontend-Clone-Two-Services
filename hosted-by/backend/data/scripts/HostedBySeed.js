const { HostedBy } = require('../../models');
const { duringYourStay } = require('../mock/DuringYourStay');

module.exports = (async function () {
    await HostedBy.sync({ force: true });
    for (let i = 0; i < 100; i++) {
        await HostedBy.create({
            duringYourStay: duringYourStay[i],
            responseTime: Math.floor(Math.random() * 168), // max hours within a week
            responseRate: Math.floor(Math.random() * 100),
            showLanguage: Math.floor(Math.random() * 2) === 0 ? true : false,
            HostId: i + 1,
            PropertyId: i + 1,
        });
    }
})();
