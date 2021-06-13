const { rest } = require('msw');
const { mockSuperhostData, mockReviewsData } = require('../mockData/backend');

module.exports.handlers = [
    rest.get(
        'http://localhost:5002/api/hostedbyService/superhost/1',
        (_req, res, ctx) => {
            return res(ctx.json(mockSuperhostData[0]));
        }
    ),
    rest.get(
        'http://localhost:5002/api/hostedbyService/superhost/80',
        (_req, res, ctx) => {
            return res(ctx.json(mockSuperhostData[1]));
        }
    ),
    rest.get('http://localhost:1984/reviews/header/1', (_req, res, ctx) => {
        return res(ctx.json(mockReviewsData[0]));
    }),
    rest.get('http://localhost:1984/reviews/header/80', (_req, res, ctx) => {
        return res(ctx.json(mockReviewsData[1]));
    }),
];
