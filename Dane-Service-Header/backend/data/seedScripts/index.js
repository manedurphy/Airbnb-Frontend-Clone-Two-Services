const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.MYSQL_USER,
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
        console.log(process.env.HOST);
        console.log('ERROR IN SEEDING SCRIPT', error);
    }
})();
