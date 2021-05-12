const Photo = require('../../models/Photo');
const { photoDescription } = require('../mock/PhotoDescription');

module.exports = (async function () {
    try {
        await Photo.sync();

        for (let i = 1; i < 530; i++) {
            await Photo.create({
                link: `https://fec-corgis.s3.amazonaws.com/houses/image/${i}`,
                isMain: i < 500 && i % 5 === 0 ? true : false,
                description: photoDescription[Math.floor(Math.random() * 100)],
                PropertyId:
                    i <= 500 ? Math.ceil(i / 5) : Math.ceil((i - 500) / 5),
            });
        }
    } catch (error) {
        console.log('ERROR IN PHOTO MIGRATION', error);
    }
})();
