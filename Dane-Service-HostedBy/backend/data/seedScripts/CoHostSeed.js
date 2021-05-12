const { CoHost } = require('../../models');

module.exports = (async function () {
    await CoHost.sync({ force: true });
    for (let i = 0; i < 25; i++) {
        await CoHost.create({
            HostId: 101 + i,
            HostedById: i === 0 ? 1 : i,
        });
    }
})();
