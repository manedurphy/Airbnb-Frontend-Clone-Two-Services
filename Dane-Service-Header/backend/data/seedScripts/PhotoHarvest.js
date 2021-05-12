module.exports.photoHarvest = async function (Photo) {
    const aws = require('aws-sdk');
    const request = require('request');
    const { join } = require('path');
    const { readFileSync, createWriteStream } = require('fs');
    const { createApi } = require('unsplash-js');
    const { photoDescription } = require('../mock/PhotoDescription');

    const download = (url, path, callback) => {
        request.head(url, (_err, _res, _body) => {
            request(url).pipe(createWriteStream(path)).on('close', callback);
        });
    };

    aws.config.update({ region: process.env.REGION });
    const s3 = new aws.S3();

    const unsplash = createApi({
        accessKey: process.env.UNSPLASH_KEY,
        fetch: require('node-fetch'),
    });

    let id = 0;
    for (let j = 0; j <= 17; j++) {
        const res = await unsplash.search.getPhotos({
            query: 'house',
            page: j + 1,
            perPage: 30,
        });

        const results = JSON.parse(JSON.stringify(res.response.results));

        for (let i = 0; i < results.length; i++) {
            id++;
            const link = results[i].urls.regular;

            const filePath = join(__dirname, '..', 'mock', 'assets', `image${id}.jpg`);

            download(link, filePath, () => {
                console.log('Downloaded to ' + filePath);
            });
        }
    }
    for (let i = 1; i <= id; i++) {
        const filePath = join(__dirname, '..', 'mock', 'assets', `image${i}.jpg`);

        const fileContent = readFileSync(filePath);
        const uploadParams = {
            Bucket: 'fec-corgis',
            Key: `houses/image/${i}`,
            Body: fileContent,
            ContentType: 'image/jpeg',
            ACL: 'public-read',
        };

        const data = await s3.upload(uploadParams).promise();
        await Photo.create({
            link: data.Location,
            isMain: i % 5 === 0 ? true : false,
            description: photoDescription[Math.floor(Math.random() * 100)],
            propertyId: Math.ceil(i / 5),
        });
    }
};
