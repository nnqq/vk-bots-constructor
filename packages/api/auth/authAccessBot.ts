import { Server, Request } from '@hapi/hapi';
import { users } from '../../users/client';

interface IAccessBot {
  payload: {
    botId?: string;
  };
  query: {
    botId?: string;
  }
}

type IAccessBotRequest = IAccessBot & Request;

export const authAccessBot = (server: Server) => {
  server.auth.strategy('accessBot', 'bearer-access-token', {
    validate: (req: IAccessBotRequest, token: string) => {
      const botId = req.payload.botId || req.query.botId;

      if (!botId) {
        throw new Error('Payload or Query should contain botId property');
      }

      if (Array.isArray(botId)) {
        throw new Error('BotId can\'t be an Array, it should be a String');
      }

      return users.authAccessBot({
        token,
        botId,
      });
    },
  });
};
