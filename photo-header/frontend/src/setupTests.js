import '@testing-library/jest-dom';
import { server } from '../../mock/server/frontend';

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
