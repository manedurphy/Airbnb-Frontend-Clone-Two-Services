require('./models/relationships');
const express = require('express');
const { join } = require('path');
const headerServiceRoutes = require('./controllers/headerServiceController');

const app = express();
const dist = join(__dirname, '..', 'frontend', 'dist');
const index = join(__dirname, '..', 'frontend', 'dist', 'index.html');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTES
app.use('/api/photo-header', headerServiceRoutes);

app.get('/api/healthz', (_, res) => {
    res.status(200).json({ message: 'healthy' });
});

app.use(express.static(dist));

app.get('*', (_, res) => {
    res.sendFile(join(index));
});

module.exports = app;
