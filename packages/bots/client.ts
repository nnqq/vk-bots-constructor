import { hemera } from '../lib/hemera';
import {
  IParams as getGroupsParams,
  IResponse as getGroupsResponse,
  path as getGroupsPath,
} from './hemeraRoutes/getGroups';

import {
  IParams as createBotParams,
  IResponse as createBotResponse,
  path as createBotPath,
} from './hemeraRoutes/createBot';

import {
  IParams as getBotConfigParams,
  IResponse as getBotConfigResponse,
  path as getBotConfigPath,
} from './hemeraRoutes/getBotConfig';

export const bots = {
  getGroups(params: getGroupsParams): Promise<getGroupsResponse> {
    return hemera.send(getGroupsPath, params);
  },

  createBot(params: createBotParams): Promise<createBotResponse> {
    return hemera.send(createBotPath, params);
  },

  getBotConfig(params: getBotConfigParams): Promise<getBotConfigResponse> {
    return hemera.send(getBotConfigPath, params);
  },
};
