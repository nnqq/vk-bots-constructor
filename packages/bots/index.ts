import { hemera } from '@nnqq/vk-bots-constructor-lib';

import {
  IParams as getGroupsParams,
  IResponse as getGroupsResponse,
  path as getGroupsPath,
} from './hemeraRoutes/getGroups/interfaces';

import {
  IParams as createBotParams,
  IResponse as createBotResponse,
  path as createBotPath,
} from './hemeraRoutes/createBot/interfaces';

import {
  IParams as getBotConfigParams,
  IResponse as getBotConfigResponse,
  path as getBotConfigPath,
} from './hemeraRoutes/getBotConfig/interfaces';

import {
  IParams as refreshBotParams,
  IResponse as refreshBotResponse,
  path as refreshBotPath,
} from './hemeraRoutes/refreshBot/interfaces';

import {
  IParams as editBotParams,
  IResponse as editBotResponse,
  path as editBotPath,
} from './hemeraRoutes/editBot/interfaces';

import {
  IParams as deleteBotParams,
  IResponse as deleteBotResponse,
  path as deleteBotPath,
} from './hemeraRoutes/deleteBot/interfaces';

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

  refreshBot(params: refreshBotParams): Promise<refreshBotResponse> {
    return hemera.send(refreshBotPath, params);
  },

  editBot(params: editBotParams): Promise<editBotResponse> {
    return hemera.send(editBotPath, params);
  },

  deleteBot(params: deleteBotParams): Promise<deleteBotResponse> {
    return hemera.send(deleteBotPath, params);
  },
};
