import { Server, Request } from '@hapi/hapi';
import { users } from '../../users/client';

export const authUser = (server: Server) => {
  server.auth.strategy('user', 'bearer-access-token', {
    validate: (req: Request, token: string) => users.authUser({ token }),
  });
};
