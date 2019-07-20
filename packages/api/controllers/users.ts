import Hapi from '@hapi/hapi';
import { users } from '../../users/client';

export const controllers = {
  registerUser(req: Hapi.Request) {
    if (Array.isArray(req.query.code)) {
      throw new Error('Code can\'t be an Array');
    }

    return users.register({
      code: req.query.code,
    });
  },
};
