const express = require('express');
const path = require('path');
const headerRoutes = require('./routes/headerRoutes');
const hostedbyRoutes = require('./routes/hostedbyRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(...headerRoutes);
app.use(...hostedbyRoutes);

app.get('/header.bundle.js', (req, res) => {
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

app.get('/hostedby.bundle.js', (req, res) => {
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

app.get('/common.bundle.js', (req, res) => {
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

app.get('/style.css', (_, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.setHeader('Cache-Control', `public, max-age=${2592000}`);
    res.sendFile(path.join(__dirname, 'dist', 'style.css'));
});

app.use(express.static('dist'));

app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => console.log(`Proxy started on port ${port}...`));
