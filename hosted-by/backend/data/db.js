const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql',
    logging: false,
});

sequelize.sync();

module.exports = sequelize;
