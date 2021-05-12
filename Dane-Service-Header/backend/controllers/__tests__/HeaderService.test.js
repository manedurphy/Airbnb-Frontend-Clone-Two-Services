const app = require('../../server');
const request = require('supertest');
const { server } = require('../../../mock/server/backend');
const { mockSuperhostData } = require('../../../mock/mockData/backend');

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

test('should query the photos of the property with ID 1', async () => {
    const res = await request(app).get('/api/headerService/1');

    expect(res.status).toEqual(200);
    expect(res.body.photos[0].Property.id).toEqual(1);
    expect(res.body.photos.length).toEqual(10);
    expect(res.body.isSuperhost).toBe(mockSuperhostData[0]);
    expect(res.body.location).toEqual({
        city: 'South Lake Tahoe',
        state: 'California',
        country: 'United States',
    });
});

test('should query the photos of the property with ID 80', async () => {
    const res = await request(app).get('/api/headerService/80');

    expect(res.status).toEqual(200);
    expect(res.body.photos[0].Property.id).toEqual(80);
    expect(res.body.photos.length).toEqual(5);
    expect(res.body.isSuperhost).toBe(mockSuperhostData[1]);
    expect(res.body.location).toEqual({
        city: 'South Lake Tahoe',
        state: 'California',
        country: 'United States',
    });
});
