require('./models/relationships');
const express = require('express');
const join = require('path').join;

const app = express();
const publicPath = join(__dirname, '..', 'frontend', 'public', 'index.html');
const hostedByRoutes = require('./controllers/hostedByController');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTES
app.use('/api/hostedbyService', hostedByRoutes);

app.get('/api/healthz', (_, res) => {
    res.status(200).json({ message: 'healthy' });
});

app.get('*', (_req, res) => {
    res.sendFile(publicPath);
});

module.exports = app;
