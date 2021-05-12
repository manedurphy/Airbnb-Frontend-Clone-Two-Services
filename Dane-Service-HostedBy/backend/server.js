require('./models/relationships');
const express = require('express');
const hostedByRoutes = require('./controllers/hostedByController/HostedByController');
const entireHouseRoutes = require('./controllers/entireHouseController/EntireHouseController');
const { join } = require('path');

const app = express();
const publicPath = join(__dirname, '..', 'frontend', 'public', 'index.html');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTES
app.use('/api/hostedbyService', hostedByRoutes);
app.use('/api/hostedbyService', entireHouseRoutes);

app.get('*', (_req, res) => {
    res.sendFile(publicPath);
});

module.exports = app;
