import Hapi from '@hapi/hapi';
import { users } from '../../users/client';

export const authUser = (server: Hapi.Server) => {
  server.auth.strategy('user', 'bearer-access-token', {
    validate: async (req: Hapi.Request, token: string) => users.authUser({ token }),
  });
};
