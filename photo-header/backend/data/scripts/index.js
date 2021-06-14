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

        await require('./PropertySeed');
        console.log('properties seeded!');

        await require('./PhotoSeed');
        console.log('photos seeded!');

        process.exit(0);
    } catch (error) {
        console.log('ERROR IN SEEDING SCRIPT', error);
    }
})();
