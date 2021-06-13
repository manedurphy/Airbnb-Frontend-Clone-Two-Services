import { mockData } from './mockData';
import { rest } from 'msw';

export const handlers = [
    rest.get('/api/hostedbyService/85', (_req, res, ctx) => {
        return res(ctx.json(mockData[0]));
    }),
    rest.get('/api/hostedbyService/14', (_req, res, ctx) => {
        return res(ctx.json(mockData[1]));
    }),
];
