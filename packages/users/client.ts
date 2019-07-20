import { hemera } from '../lib/hemera';
import {
  IParams as registerParams,
  IResponse as registerResponse,
  path as registerPath,
} from './hemeraRoutes/register';

import {
  IParams as authUserParams,
  IResponse as authUserResponse,
  path as authUserPath,
} from './hemeraRoutes/auth/authUser';

export const users = {
  register(params: registerParams): Promise<registerResponse> {
    return hemera.send(registerPath, params);
  },

  authUser(params: authUserParams): Promise<authUserResponse> {
    return hemera.send(authUserPath, params);
  },
};
