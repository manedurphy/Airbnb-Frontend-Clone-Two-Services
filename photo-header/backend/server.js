require('./models/relationships');
const express = require('express');
const { join } = require('path');
const headerServiceRoutes = require('./controllers/headerServiceController');

const app = express();
const publicPath = join(__dirname, '..', 'frontend', 'public', 'index.html');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTES
app.use('/api/headerService', headerServiceRoutes);

app.get('/api/healthz', (_, res) => {
    res.status(200).json({ message: 'healthy' });
});

app.get('*', (_req, res) => {
    res.sendFile(join(publicPath));
});

module.exports = app;
