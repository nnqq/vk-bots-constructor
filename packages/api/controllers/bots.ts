import { bots } from '../../bots';
import { IAuth } from '../auth/interfaces';
import { IParams as ICreateBotParams } from '../../bots/hemeraRoutes/createBot/interfaces';
import { IQueryBotId } from '../interfaces';
import { IParamsBase } from '../../bots/hemeraRoutes/editBot/interfaces';

type IGetGroups = IAuth;

interface ICreateBot {
  query: ICreateBotParams;
}

type IEditBot = {
  payload: IParamsBase;
} & IQueryBotId;

type IDeleteBot = IQueryBotId & IAuth;

export const controllers = {
  getGroups(req: IGetGroups) {
    const { vkUserAccessToken } = req.auth.credentials;

    return bots.getGroups({
      vkUserAccessToken,
    });
  },

  createBot(req: ICreateBot) {
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

  editBot(req: IEditBot) {
    const params = {
      ...req.payload,
      ...req.query,
    };

    return bots.editBot(params);
  },

  deleteBot(req: IDeleteBot) {
    const { userId } = req.auth.credentials;

    const params = {
      ...req.query,
      userId,
    };

    return bots.deleteBot(params);
  },
};
