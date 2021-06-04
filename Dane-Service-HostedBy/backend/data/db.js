const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql',
    logging: false,
});

sequelize.sync();
// sequelize.sync({ force: true });

module.exports = sequelize;
