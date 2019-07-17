import { registerUserPath } from '../../lib/hemeraRoutes/users.js';
import { hemera } from '../../lib/hemera/index.js';
import { boomDecorator } from '../../lib/decorators/boomDecorator.js';

export const controllers = {
  registerUser(req) {
    return boomDecorator(hemera.send(registerUserPath, req.query));
  },
};
