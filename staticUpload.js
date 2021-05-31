const fs = require('fs');
const path = require('path');
const mime = require('mime-types');
const { S3 } = require('aws-sdk');

const s3 = new S3();
const folderPath = path.join(__dirname, 'Dane-Proxy', 'dist');

fs.readdir(folderPath, (err, data) => {
    if (err) throw err;
    data.forEach((file) => {
        const fileContent = fs.readFileSync(path.join(folderPath, file));
        const fileType = mime.lookup(path.join(folderPath, file));

        const params = {
            Bucket: process.env.BUCKET,
            Key: `static/${file}`,
            Body: fileContent,
            ACL: 'public-read',
            ContentType: fileType,
        };
        s3.upload(params, function (_, data) {
            console.log('Success!', data);
        });
    });
});
