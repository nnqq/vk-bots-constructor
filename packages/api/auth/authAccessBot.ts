import { Server, Request } from '@hapi/hapi';
import { users } from '../../users';

interface IAccessBot {
  query?: {
    botId?: string;
  }
}

type IAccessBotRequest = IAccessBot & Request;

export const authAccessBot = (server: Server) => {
  server.auth.strategy('accessBot', 'bearer-access-token', {
    validate: (req: IAccessBotRequest, token: string) => {
      if (!req.query || !req.query.botId) {
        return {
          isValid: false,
          credentials: {},
        };
      }

      const { botId } = req.query;

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
