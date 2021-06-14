const { Language } = require('../../models');
const { languages } = require('../mock/Languages');

module.exports = (async function () {
    await Language.sync({ force: true });
    for (let i = 0; i < languages.length; i++) {
        await Language.create({
            name: languages[i],
        });
    }
})();
