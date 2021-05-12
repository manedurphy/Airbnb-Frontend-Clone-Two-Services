const express = require('express');
const { S3 } = require('aws-sdk');
const headerArgs = require('./routes/headerRoutes');
const hostedbyArgs = require('./routes/hostedbyRoutes');
const path = require('path');

const s3 = new S3();
const app = express();
const port = process.env.PORT || 5000;

app.use(...headerArgs);
app.use(...hostedbyArgs);

app.get('/header.bundle.js', (req, res) => {
    let params;

    if (req.header('Accept-Encoding').includes('br')) {
        res.setHeader('Content-Encoding', 'br');
        res.setHeader('Content-Type', 'application/javascript');
        res.setHeader('Cache-Control', `public, max-age=${2592000}`);

        params = {
            Bucket: 'fec-corgis',
            Key: 'static/header.bundle.js.br',
        };
        res.sendFile(path.join(__dirname, 'dist', 'header.bundle.js.br'));
    } else if (req.header('Accept-Encoding').includes('gz')) {
        res.setHeader('Content-Encoding', 'gzip');
        res.setHeader('Content-Type', 'application/javascript');
        res.setHeader('Cache-Control', `public, max-age=${2592000}`);

        params = {
            Bucket: 'fec-corgis',
            Key: 'static/header.bundle.js.gz',
        };
        res.sendFile(path.join(__dirname, 'dist', 'header.bundle.js.gz'));
    } else {
        params = {
            Bucket: 'fec-corgis',
            Key: 'static/header.bundle.js',
        };
        res.sendFile(path.join(__dirname, 'dist', 'header.bundle.js'));
    }

    s3.getObject(params).createReadStream().pipe(res);
});

app.get('/hostedby.bundle.js', (req, res) => {
    let params;

    if (req.header('Accept-Encoding').includes('br')) {
        res.setHeader('Content-Encoding', 'br');
        res.setHeader('Content-Type', 'application/javascript');
        res.setHeader('Cache-Control', `public, max-age=${2592000}`);

        params = {
            Bucket: 'fec-corgis',
            Key: 'static/hostedby.bundle.js.br',
        };
        res.sendFile(path.join(__dirname, 'dist', 'hostedby.bundle.js.br'));
    } else if (req.header('Accept-Encoding').includes('gz')) {
        res.setHeader('Content-Encoding', 'gzip');
        res.setHeader('Content-Type', 'application/javascript');
        res.setHeader('Cache-Control', `public, max-age=${2592000}`);

        params = {
            Bucket: 'fec-corgis',
            Key: 'static/hostedby.bundle.js.gz',
        };
        res.sendFile(path.join(__dirname, 'dist', 'hostedby.bundle.js.gz'));
    } else {
        params = {
            Bucket: 'fec-corgis',
            Key: 'static/hostedby.bundle.js',
        };
        res.sendFile(path.join(__dirname, 'dist', 'hostedby.bundle.js'));
    }

    s3.getObject(params).createReadStream().pipe(res);
});

app.get('/common.bundle.js', (req, res) => {
    let params;

    if (req.header('Accept-Encoding').includes('br')) {
        res.setHeader('Content-Encoding', 'br');
        res.setHeader('Content-Type', 'application/javascript');
        res.setHeader('Cache-Control', `public, max-age=${2592000}`);

        params = {
            Bucket: 'fec-corgis',
            Key: 'static/common.bundle.js.br',
        };
        res.sendFile(path.join(__dirname, 'dist', 'common.bundle.js.br'));
    } else if (req.header('Accept-Encoding').includes('gz')) {
        res.setHeader('Content-Encoding', 'gzip');
        res.setHeader('Content-Type', 'application/javascript');
        res.setHeader('Cache-Control', `public, max-age=${2592000}`);

        params = {
            Bucket: 'fec-corgis',
            Key: 'static/common.bundle.js.gz',
        };
        res.sendFile(path.join(__dirname, 'dist', 'common.bundle.js.gz'));
    } else {
        params = {
            Bucket: 'fec-corgis',
            Key: 'static/common.bundle.js',
        };
        res.sendFile(path.join(__dirname, 'dist', 'common.bundle.js'));
    }

    s3.getObject(params).createReadStream().pipe(res);
});

app.get('/style.css', (_, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.setHeader('Cache-Control', `public, max-age=${2592000}`);
    res.sendFile(path.join(__dirname, 'dist', 'style.css'));
    const params = {
        Bucket: 'fec-corgis',
        Key: 'static/style.css',
    };

    s3.getObject(params).createReadStream().pipe(res);
});

app.get('*', (_req, res) => {
    const params = {
        Bucket: 'fec-corgis',
        Key: 'static/index.html',
    };

    s3.getObject(params).createReadStream().pipe(res);
});

app.listen(port, () => console.log(`Proxy started on port ${port}...`));
