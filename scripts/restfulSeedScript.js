const axios = require('axios');
const faker = require('faker');

const coHosts = [
    {
        name: 'cohost1',
        email: 'cohost1@email.com',
        identityVerified: true,
        isSuperhost: true,
        numberOfReviews: 0,
        about: faker.lorem.sentences(),
        avatar: `https://randomuser.me/api/portraits/men/${49}.jpg`,
        languages: ['English'],
    },
    {
        name: 'cohost2',
        email: 'cohost2@email.com',
        identityVerified: true,
        isSuperhost: true,
        numberOfReviews: 0,
        about: faker.lorem.sentences(),
        avatar: `https://randomuser.me/api/portraits/women/${49}.jpg`,
        languages: ['English'],
    },
];

async function seedDatabases() {
    for (let i = 0; i < coHosts.length; i++) {
        await axios.post(`${process.env.PUBLIC_IP}/api/hostedbyService/host`, coHosts[i]);
    }

    const names = generateNames();

    for (let i = 0; i < names.length; i++) {
        const name = names[i];

        const host = {
            name: names[i],
            email: `${name}@email.com`,
            identityVerified: Math.random() < 0.5 ? true : false,
            isSuperhost: Math.random() < 0.5 ? true : false,
            numberOfReviews: Math.floor(Math.random() * 200),
            about: faker.lorem.sentences(),
            avatar: `https://randomuser.me/api/portraits/${Math.random() < 0.5 ? 'men' : 'women'}/${i}.jpg`,
            languages: generateLanguages(),
        };

        const property = {
            title: `This is the title for ${name}'s property`,
            hostId: 1,
        };

        await axios.post(`${process.env.PUBLIC_IP}/api/hostedbyService/host`, host);
        await axios.post(`${process.env.PUBLIC_IP}/api/headerService/property`, property);

        const photos = [];

        for (let j = 1 * 10 + i; j <= 10 + 10 * i; j++) {
            photos.push({
                link: `https://fec-corgis.s3.amazonaws.com/houses/images/${j}`,
                description: faker.lorem.sentence(),
                PropertyId: i + 1,
            });
        }

        await axios.post(`${process.env.PUBLIC_IP}/api/headerService/photos`, photos);

        const hostedbyRecord = {
            duringYourStay: faker.lorem.sentence(),
            responseTime: Math.floor(Math.random() * 168), // max hours within a week
            responseRate: Math.floor(Math.random() * 100),
            HostId: i + 2,
            PropertyId: i,
            coHosts: ['cohost1@email.com', 'cohost2@email.com'],
        };
        await axios.post(`${process.env.PUBLIC_IP}/api/hostedbyService/hostedByRecord`, hostedbyRecord);
    }
}

function generateNames() {
    const names = [];
    for (let i = 1; i <= 50; i++) {
        while (true) {
            const name = faker.name.firstName();
            if (names.indexOf(name) !== -1) {
                continue;
            } else {
                names.push(name);
                break;
            }
        }
    }
    console.log('Names generated!');
    return names;
}

function generateLanguages() {
    const languages = ['English', 'Spanish', 'Japanese', 'Korean', 'French', 'Russian'];
    const spoken = [];

    for (let i = 0; i < languages.length; i++) {
        Math.random() < 0.5 && spoken.push(languages[i]);
    }
    console.log('Languages generated!');
    return spoken;
}

seedDatabases()
    .then(() => console.log('Database seeded!'))
    .catch((err) => console.log('Error seeding database', err));
