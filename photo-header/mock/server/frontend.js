import { handlers } from '../handlers/frontend';
import { setupServer } from 'msw/node';

export const server = setupServer(...handlers);
