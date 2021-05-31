const express = require('express');
const { join } = require('path');
const headerServiceRoutes = require('./controllers/headerServiceController/HeaderServiceController');

const app = express();
const publicPath = join(__dirname, '..', 'frontend', 'public', 'index.html');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTES
app.use('/api/headerService', headerServiceRoutes);

app.get('*', (_req, res) => {
    res.sendFile(join(publicPath));
});

module.exports = app;
