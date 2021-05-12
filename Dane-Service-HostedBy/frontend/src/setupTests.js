import server from './mocks/server';
import '@testing-library/jest-dom';

beforeEach(() => server.listen());

afterEach(() => server.resetHandlers);

afterAll(() => server.close());
