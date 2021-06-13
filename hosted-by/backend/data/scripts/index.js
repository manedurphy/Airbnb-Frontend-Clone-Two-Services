const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
});

(async function () {
    try {
        await connection.promise().execute('DROP DATABASE IF EXISTS `HostedBy`');
        await connection.promise().execute('CREATE DATABASE `HostedBy`');

        await require('./HostSeed');
        console.log('hosts seeded!');

        await require('./CoHostSeed');
        console.log('cohosts seeded!');

        await require('./LanguageSeed');
        console.log('languages seeded!');

        await require('./HostLanguageSeed');
        console.log('host-languages seeded!');

        await require('./HostedBySeed');
        console.log('hosted-by seeded!');

        console.log('database seeded!');
        process.exit(0);
    } catch (error) {
        console.log('ERROR IN SEEDING SCRIPT', error);
    }
})();
