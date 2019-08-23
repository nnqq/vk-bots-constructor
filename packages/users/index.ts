import { hemera } from '../lib/hemera';
import {
  IParams as registerParams,
  IResponse as registerResponse,
  path as registerPath,
} from './hemeraRoutes/register/interfaces';

import {
  IParams as authUserParams,
  IResponse as authUserResponse,
  path as authUserPath,
} from './hemeraRoutes/auth/authUser/interfaces';

import {
  IParams as authAccessBotParams,
  IResponse as authAccessBotResponse,
  path as authAccessBotPath,
} from './hemeraRoutes/auth/authAccessBot/interfaces';

import {
  IParams as addBotParams,
  IResponse as addBotResponse,
  path as addBotPath,
} from './hemeraRoutes/addBot/interfaces';

import {
  IParams as deleteBotParams,
  IResponse as deleteBotResponse,
  path as deleteBotPath,
} from './hemeraRoutes/deleteBot/interfaces';

export const users = {
  register(params: registerParams): Promise<registerResponse> {
    return hemera.send(registerPath, params);
  },

  authUser(params: authUserParams): Promise<authUserResponse> {
    return hemera.send(authUserPath, params);
  },

  authAccessBot(params: authAccessBotParams): Promise<authAccessBotResponse> {
    return hemera.send(authAccessBotPath, params);
  },

  addBot(params: addBotParams): Promise<addBotResponse> {
    return hemera.send(addBotPath, params);
  },

  deleteBot(params: deleteBotParams): Promise<deleteBotResponse> {
    return hemera.send(deleteBotPath, params);
  },
};
