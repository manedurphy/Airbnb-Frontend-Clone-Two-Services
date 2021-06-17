const axios = require('axios');

// For use with Docker compose
// const hostsAPI = 'http://localhost:8080';

// For use with Kind
// const hostsAPI = 'http://localhost:5000';

// For cloud load balancer
const hostsAPI = 'http://23.239.6.56';

const languages = ['English', 'Spanish', 'Japanese', 'Korean', 'French', 'Russian'];
const languageRequests = [];

languages.forEach((language) =>
    languageRequests.push(axios.post(`${hostsAPI}/hosts/create-language`, { name: language })),
);

Promise.all(languageRequests).then(() => console.log('Languages seeded!'));
