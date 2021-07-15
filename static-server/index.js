const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;
const commonPath = '/apps/airbnb-clone';

if (process.env.NODE_ENV === 'development') {
    const propertiesRoutes = require('./routes/propertiesRoutes');
    const hostsRoutes = require('./routes/hostsRoutes');
    app.use(...propertiesRoutes);
    app.use(...hostsRoutes);
}

app.get(commonPath + '/header.bundle.js', (req, res) => {
    if (req.header('Accept-Encoding').includes('br')) {
        res.setHeader('Content-Encoding', 'br');
        res.setHeader('Content-Type', 'application/javascript');
        res.setHeader('Cache-Control', `public, max-age=${2592000}`);

        res.sendFile(path.join(__dirname, 'dist', 'header.bundle.js.br'));
    } else if (req.header('Accept-Encoding').includes('gz')) {
        res.setHeader('Content-Encoding', 'gzip');
        res.setHeader('Content-Type', 'application/javascript');
        res.setHeader('Cache-Control', `public, max-age=${2592000}`);

        res.sendFile(path.join(__dirname, 'dist', 'header.bundle.js.gz'));
    } else {
        res.sendFile(path.join(__dirname, 'dist', 'header.bundle.js'));
    }
});

app.get(commonPath + '/hostedby.bundle.js', (req, res) => {
    if (req.header('Accept-Encoding').includes('br')) {
        res.setHeader('Content-Encoding', 'br');
        res.setHeader('Content-Type', 'application/javascript');
        res.setHeader('Cache-Control', `public, max-age=${2592000}`);

        res.sendFile(path.join(__dirname, 'dist', 'hostedby.bundle.js.br'));
    } else if (req.header('Accept-Encoding').includes('gz')) {
        res.setHeader('Content-Encoding', 'gzip');
        res.setHeader('Content-Type', 'application/javascript');
        res.setHeader('Cache-Control', `public, max-age=${2592000}`);

        res.sendFile(path.join(__dirname, 'dist', 'hostedby.bundle.js.gz'));
    } else {
        res.sendFile(path.join(__dirname, 'dist', 'hostedby.bundle.js'));
    }
});

app.get(commonPath + '/common.bundle.js', (req, res) => {
    if (req.header('Accept-Encoding').includes('br')) {
        res.setHeader('Content-Encoding', 'br');
        res.setHeader('Content-Type', 'application/javascript');
        res.setHeader('Cache-Control', `public, max-age=${2592000}`);

        res.sendFile(path.join(__dirname, 'dist', 'common.bundle.js.br'));
    } else if (req.header('Accept-Encoding').includes('gz')) {
        res.setHeader('Content-Encoding', 'gzip');
        res.setHeader('Content-Type', 'application/javascript');
        res.setHeader('Cache-Control', `public, max-age=${2592000}`);

        res.sendFile(path.join(__dirname, 'dist', 'common.bundle.js.gz'));
    } else {
        res.sendFile(path.join(__dirname, 'dist', 'common.bundle.js'));
    }
});

app.get(commonPath + '/style.css', (_, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.setHeader('Cache-Control', `public, max-age=${2592000}`);
    res.sendFile(path.join(__dirname, 'dist', 'style.css'));
});

app.get('/healthz', (_, res) => {
    res.status(200).json({ message: 'healthy!' });
});

app.use(commonPath, express.static('dist'));

app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => console.log(`Serving static files on port ${port}...`));
