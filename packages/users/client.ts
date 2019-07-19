import { hemera } from '../lib/hemera';
import {
  IParams as registerParams,
  IResponse as registerResponse,
  path as registerPath,
} from './hemeraRoutes/register';

export const users = {
  register(params: registerParams): Promise<registerResponse> {
    return hemera.send(registerPath, params);
  },
};
