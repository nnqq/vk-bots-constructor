import { Request } from '@hapi/hapi';
import { bots } from '../../bots/client';
import { IAuth } from '../auth/interfaces';
import { IParams as ICreateBotParams } from '../../bots/hemeraRoutes/createBot';

type IGetGroupsRequest = Request & IAuth;

interface ICreateBot {
  query: ICreateBotParams;
}
type ICreateBotRequest = Request & ICreateBot;

export const controllers = {
  getGroups(req: IGetGroupsRequest) {
    const { vkUserAccessToken } = req.auth.credentials;

    return bots.getGroups({
      vkUserAccessToken,
    });
  },

  createBot(req: ICreateBotRequest) {
    const { code, state } = req.query;

    if (Array.isArray(code)) {
      throw new Error('Code should be a String');
    }

    if (Array.isArray(state)) {
      throw new Error('State should be a String');
    }

    return bots.createBot({
      code,
      state,
    });
  },
};
