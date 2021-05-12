const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
});

(async function () {
    try {
        await connection.promise().execute('DROP DATABASE IF EXISTS `Header`');
        await connection.promise().execute('CREATE DATABASE `Header`');
        connection.destroy();

        await require('./PropertySeed');
        await require('./PhotoSeed');
    } catch (error) {
        console.log('ERROR IN SEEDING SCRIPT', error);
    }
})();
