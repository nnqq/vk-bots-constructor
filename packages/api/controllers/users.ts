import { boomDecorator } from '../../lib/decorators/boomDecorator';
import { users } from '../../users/client';

export const controllers = {
  registerUser(req: any) {
    return boomDecorator(users.register({
      code: req.query.code,
    }));
  },
};
