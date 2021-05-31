const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Header', process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql',
});

module.exports = sequelize;
