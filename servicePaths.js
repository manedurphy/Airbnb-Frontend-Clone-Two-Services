const { resolve } = require('path');

exports.header = resolve(__dirname, 'Dane-Service-Header', 'frontend', 'src', 'index.jsx');

exports.headerNodeModules = resolve(__dirname, 'Dane-Service-Header', 'node_modules');

exports.hostedby = resolve(__dirname, 'Dane-Service-HostedBy', 'frontend', 'src', 'index.jsx');

exports.hostedbyNodeModules = resolve(__dirname, 'Dane-Service-HostedBy', 'node_modules');
