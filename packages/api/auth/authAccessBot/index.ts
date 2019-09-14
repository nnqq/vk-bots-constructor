import { Server } from '@hapi/hapi';
import { validate } from './validate';

export const authAccessBot = (server: Server) => {
  server.auth.strategy('accessBot', 'bearer-access-token', { validate });
};
