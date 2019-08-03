import { Server, Request } from '@hapi/hapi';
import { users } from '../../users/client';

interface IAccessBot {
  payload: {
    botId?: string;
  }
}

type IAccessBotRequest = IAccessBot & Request;

export const authAccessBot = (server: Server) => {
  server.auth.strategy('accessBot', 'bearer-access-token', {
    validate: (req: IAccessBotRequest, token: string) => {
      const { botId } = req.payload;

      if (!botId) {
        throw new Error('Payload should contain botId property');
      }

      return users.authAccessBot({
        token,
        botId,
      });
    },
  });
};
