import { rest } from 'msw';
import { mockData } from '../mockData/frontend';

export const handlers = [
    rest.get('/api/headerService/1', (_req, res, ctx) => {
        return res(ctx.json(mockData[0]));
    }),
    rest.get('/api/headerService/2', (_req, res, ctx) => {
        return res(ctx.json(mockData[1]));
    }),
    rest.get('/api/headerService/78', (_req, res, ctx) => {
        return res(ctx.json(mockData[2]));
    }),
];
