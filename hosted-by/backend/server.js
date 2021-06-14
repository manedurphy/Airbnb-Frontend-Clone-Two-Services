require('./models/relationships');
const express = require('express');
const join = require('path').join;

const app = express();
const dist = join(__dirname, '..', 'frontend', 'dist');
const index = join(__dirname, '..', 'frontend', 'dist', 'index.html');
const hostedByRoutes = require('./controllers/hostedByController');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTES
app.use('/api/hosted-by', hostedByRoutes);

app.get('/api/healthz', (_, res) => {
    res.status(200).json({ message: 'healthy' });
});

app.use(express.static(dist));

app.get('*', (_req, res) => {
    res.sendFile(index);
});

module.exports = app;
