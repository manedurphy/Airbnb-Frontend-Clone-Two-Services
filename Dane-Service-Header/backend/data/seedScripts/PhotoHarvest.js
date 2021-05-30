(async function () {
    const aws = require('aws-sdk');
    const request = require('request');
    const { join } = require('path');
    const { readFileSync, createWriteStream } = require('fs');
    const { createApi } = require('unsplash-js');

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
            Key: `houses/images/${i}`,
            Body: fileContent,
            ContentType: 'image/jpeg',
            ACL: 'public-read',
        };

        await s3.upload(uploadParams).promise();
    }
})();
