import { Request } from '@hapi/hapi';
import { bots } from '../../bots/client';

export const controllers = {
  getGroups(req: Request) {
    // @ts-ignore
    const { vkUserAccessToken } = req.auth.credentials;

    return bots.getGroups({
      vkUserAccessToken,
    });
  },

  createBot(req: Request) {
    const { code } = req.query;
    if (Array.isArray(code)) {
      throw new Error('Code should be a String');
    }

    return bots.createBot({
      code,
    });
  },
};
