const app = require('../../server');
const request = require('supertest');
const { server } = require('../../../mock/server/backend');

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('GET /more-places', () => {
    test('should return object with title, photo, and superhost status for more places to stay services', async () => {
        const res = await request(app).get('/api/headerService/more-places/1');

        expect(res.body).toEqual({
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
            photo: 'https://fec-corgis.s3.amazonaws.com/houses/image/5',
            isSuperhost: false,
        });
        expect(res.status).toBe(200);
    });
});
