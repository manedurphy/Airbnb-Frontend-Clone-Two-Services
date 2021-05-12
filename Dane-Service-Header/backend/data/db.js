const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Header', process.env.MYSQL_USERNAME, process.env.MYSQL_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;
