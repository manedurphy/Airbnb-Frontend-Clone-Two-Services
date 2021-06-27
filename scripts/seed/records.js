const axios = require('axios');
const faker = require('faker');
const http = require('http');

// For use with Docker compose
// const hostsAPI = 'http://localhost:8080';
// const propertiesAPI = 'http://localhost:8081';

// For use with Kind
const hostsAPI = 'http://localhost:5000';
const propertiesAPI = 'http://localhost:5000';

// For use with raspberry pis
// const hostsAPI = 'http://10.0.0.251:32454';
// const propertiesAPI = 'http://10.0.0.251:32454';

// For cloud load balancer
// const hostsAPI = 'http://23.239.6.56';
// const propertiesAPI = 'http://23.239.6.56';

const s3Endpoint = process.env.BUCKET_URL;
// const httpAgent = null;
const httpAgent = new http.Agent({ keepAlive: true });

const languages = ['English', 'Spanish', 'Japanese', 'Korean', 'French', 'Russian'];

async function seedRecords() {
    try {
        const createHostsRequests = [];
        for (let i = 1; i < 100; i++) {
            const name = faker.name.firstName();
            createHostsRequests.push(
                axios.post(
                    `${hostsAPI}/hosts/create-host`,
                    {
                        firstName: name,
                        lastName: faker.name.lastName(),
                        email: `${name + Math.random()}@email.com`,
                        identityVerified: Math.random() < 0.5 ? true : false,
                        isSuperhost: Math.random() < 0.5 ? true : false,
                        numberOfReviews: Math.floor(Math.random() * 200),
                        responseTime: Math.floor(Math.random() * 168), // max hours within a week
                        responseRate: Math.floor(Math.random() * 100),
                        about: faker.lorem.sentences(),
                        avatar: `https://randomuser.me/api/portraits/${Math.random() < 0.5 ? 'men' : 'women'}/${i}.jpg`,
                        languages: generateLanguages(),
                        joinedOn: randomDate(new Date(2012, 0, 1), new Date()),
                    },
                    { httpAgent },
                ),
            );
        }

        let responses = await Promise.all(createHostsRequests);
        const hosts = [];
        const createPropertyRequests = [];
        responses.forEach((res) => hosts.push(res.data.host.id));

        for (let i = 0; i < hosts.length; i++) {
            const hostId = hosts[Math.floor(Math.random() * hosts.length)];
            createPropertyRequests.push(
                axios.post(
                    `${propertiesAPI}/properties/create-property`,
                    {
                        title: faker.lorem.sentence(),
                        numberOfReviews: Math.floor(Math.random() * 200),
                        duringYourStay: faker.lorem.sentence(),
                        city: faker.address.city(),
                        state: faker.address.state(),
                        country: faker.address.country(),
                        hostId,
                        cohosts: getCohosts(hostId, hosts),
                    },
                    { httpAgent },
                ),
            );
        }

        responses = await Promise.all(createPropertyRequests);
        const properties = [];
        const createPhotosRequest = [];

        responses.forEach((res) => properties.push(res.data.property));
        for (let i = 0; i < properties.length; i++) {
            const photos = [];
            for (let j = 1 + 5 * i; j <= 5 + 5 * i; j++) {
                photos.push({
                    link: `${s3Endpoint}/${j}`,
                    description: faker.lorem.sentence(),
                    propertyId: properties[i].id,
                });
            }
            createPhotosRequest.push(
                axios.post(`${propertiesAPI}/properties/create-photos`, { photos }, { httpAgent }),
            );
        }
        await Promise.all(createPhotosRequest);
        console.log('100 records seeded!');
    } catch (error) {
        console.error('[ERROR]', error);
    }
}

function generateLanguages() {
    const spoken = [];

    for (let i = 0; i < languages.length; i++) {
        Math.random() < 0.5 && spoken.push(languages[i]);
    }

    return spoken;
}

function getCohosts(hostId, hosts) {
    const iterations = Math.floor(Math.random() * 3 + 1);
    const cohostIds = [];

    for (let i = 0; i < iterations; i++) {
        let cohostId = hosts[Math.floor(Math.random() * hosts.length)];

        while (cohostId == hostId) {
            cohostId = hosts[Math.floor(Math.random() * hosts.length)];
        }

        cohostIds.push(cohostId);
    }

    return cohostIds;
}

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

seedRecords();
