import Hapi from '@hapi/hapi';
import { bots } from '../../bots/client';

export const controllers = {
  getGroups(req: Hapi.Request) {
    return bots.getGroups({
      vkUserAccessToken: req.auth.credentials.vkUserAccessToken,
    });
  },
};
