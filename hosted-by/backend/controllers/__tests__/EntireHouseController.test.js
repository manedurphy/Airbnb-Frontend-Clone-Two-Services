const request = require('supertest');
const app = require('../../server');

describe('GET /api/hostedbyService/entire-house/:id', () => {
    test('Should return data for Entire House service', async () => {
        const res = await request(app).get(
            '/api/hostedbyService/entire-house/1'
        );

        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            name: 'Konnor',
            avatar: 'https://randomuser.me/api/portraits/men/0.jpg',
            isSuperhost: false,
        });
    });

    test('Should return 404 when data not found', async () => {
        const res = await request(app).get(
            '/api/hostedbyService/entire-house/1000'
        );

        expect(res.status).toBe(404);
        expect(res.body.message).toBe(
            'Data for entire-house service could not be queried'
        );
    });
});
