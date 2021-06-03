const axios = require('axios');
const faker = require('faker');
const hostsAPI = 'http://localhost:8080';
const propertiesAPI = 'http://localhost:8081';
const s3Endpoint = 'https://fec-corgis.s3.amazonaws.com/houses/images';

const languages = ['English', 'Spanish', 'Japanese', 'Korean', 'French', 'Russian'];
const languageRequests = [];
const hosts = [];

languages.forEach((language) =>
    languageRequests.push(axios.post(`${hostsAPI}/api/hosts/create-language`, { name: language })),
);
Promise.all(languageRequests).then(() => {
    const createHostsRequests = [];

    for (let i = 1; i <= 50; i++) {
        const name = faker.name.firstName();
        createHostsRequests.push(
            axios.post(`${hostsAPI}/api/hosts/create-host`, {
                firstName: name,
                lastName: faker.name.lastName(),
                email: `${name}@email.com`,
                identityVerified: Math.random() < 0.5 ? true : false,
                isSuperhost: Math.random() < 0.5 ? true : false,
                numberOfReviews: Math.floor(Math.random() * 200),
                about: faker.lorem.sentences(),
                avatar: `https://randomuser.me/api/portraits/${Math.random() < 0.5 ? 'men' : 'women'}/${i}.jpg`,
                languages: generateLanguages(),
            }),
        );
    }

    Promise.all(createHostsRequests).then((responses) => {
        const createPropertyRequests = [];

        responses.forEach((res) => hosts.push(res.data));

        for (let i = 0; i < 25; i++) {
            const hostId = hosts[Math.floor(Math.random() * hosts.length)].host.ID;

            createPropertyRequests.push(
                axios.post(`${propertiesAPI}/api/properties/create-property`, {
                    title: faker.lorem.sentence(),
                    rating: 0,
                    numberOfReviews: 0,
                    duringYourStay: faker.lorem.sentence(),
                    city: faker.address.city(),
                    state: faker.address.state(),
                    country: faker.address.country(),
                    hostId,
                    cohosts: getCohosts(hostId),
                }),
            );
        }

        Promise.all(createPropertyRequests).then((responses) => {
            const properties = [];
            const createPhotosRequest = [];

            responses.forEach((res) => properties.push(res.data.property));

            for (let i = 0; i < properties.length; i++) {
                const photos = [];
                for (let j = 1 + 10 * i; j <= 10 + 10 * i; j++) {
                    photos.push({
                        link: `${s3Endpoint}/${j}`,
                        description: faker.lorem.sentence(),
                        propertyId: properties[i].id,
                    });
                }

                createPhotosRequest.push(axios.post(`${propertiesAPI}/api/properties/create-photos`, { photos }));
            }

            Promise.all(createPhotosRequest).then(() => console.log('Database seeded!'));
        });
    });
});

function generateLanguages() {
    const spoken = [];

    for (let i = 0; i < languages.length; i++) {
        Math.random() < 0.5 && spoken.push(languages[i]);
    }

    return spoken;
}

function getCohosts(hostId) {
    const iterations = Math.floor(Math.random() * 3 + 1);
    const cohostIds = [];

    for (let i = 0; i < iterations; i++) {
        let coHostId = hosts[Math.floor(Math.random() * hosts.length)].host.ID;

        while (coHostId == hostId) {
            coHostId = hosts[Math.floor(Math.random() * hosts.length)].host.ID;
        }

        cohostIds.push(coHostId);
    }

    return cohostIds;
}
