const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
});

(async function () {
    try {
        await connection
            .promise()
            .execute('DROP DATABASE IF EXISTS `HostedBy`');
        await connection.promise().execute('CREATE DATABASE `HostedBy`');
        connection.destroy();

        await require('./HostSeed');
        await require('./CoHostSeed');
        await require('./LanguageSeed');
        await require('./HostLanguageSeed');
        await require('./HostedBySeed');
    } catch (error) {
        console.log('ERROR IN SEEDING SCRIPT', error);
    }
})();
