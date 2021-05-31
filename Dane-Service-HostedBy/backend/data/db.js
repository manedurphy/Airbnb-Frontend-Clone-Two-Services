const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('HostedBy', process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql',
    logging: false,
});

module.exports = sequelize;
