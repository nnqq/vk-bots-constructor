import fetch from 'node-fetch';
import { stringify } from 'querystring';
import uuidv4 from 'uuid/v4';
import { IHemeraPath } from '../../lib/hemera';
import { handlerDecorator } from '../../lib/decorators/handlerDecorator';
import { Vk } from '../../lib/Vk';
import {
  CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, DOMAIN,
} from '../constants';
import { IOAuthError, isOAuthError } from '../../lib/helpers';
import { db } from '../database/client';
import { logger } from '../../lib/logger';
import { botFather } from '../helpers/BotFather';
import { users } from '../../users/client';

export const path: IHemeraPath = {
  topic: 'bots',
  cmd: 'createBot',
};

export interface IParams {
  code: string;
}

export interface IResponse {
  botId: string;
}

interface IOAuthSuccess {
  /* eslint-disable camelcase */
  access_token_XXXX: string; // access_token_XXXX where XXXX is groupId
  expires_in: number;
  /* eslint-enable camelcase */
  state: string; // userId
}

type IOAuthResponse = IOAuthSuccess | IOAuthError;

export const handler = handlerDecorator(async (params: IParams): Promise<IResponse> => {
  const { code } = params;

  const qs = stringify({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: REDIRECT_URI,
    code,
  });

  const raw = await fetch(`https://oauth.vk.com/access_token?${qs}`);

  const oAuthResponse: IOAuthResponse = await raw.json();

  if (isOAuthError(oAuthResponse)) {
    logger.error(oAuthResponse);
    throw new Error(oAuthResponse.error_description);
  }

  delete oAuthResponse.expires_in;

  const [accessTokenXxxx, token] = Object.entries(oAuthResponse)[0];

  const vkGroupId = +accessTokenXxxx.split('_').slice(-1);

  const vk = new Vk({
    token,
  });

  const [botsInGroup, callbackServers, confirmation] = await Promise.all([
    db.bots.countDocuments({ vkGroupId }),
    vk.api('groups.getCallbackServers', {
      group_id: vkGroupId,
    }),
    vk.api('groups.getCallbackConfirmationCode', {
      group_id: vkGroupId,
    }),
  ]);

  if (botsInGroup === 1) {
    logger.error('Someone tried to add second bot to single group');
    throw new Error('Can\'t create second bot in one group');
  } else if (botsInGroup > 1) {
    logger.fatal(`Found ${botsInGroup} bots at one group ${vkGroupId}!!!`);
    throw new Error('Can\'t create several bots in one group');
  }

  if (callbackServers.count === 10) {
    await vk.api('groups.deleteCallbackServer', {
      group_id: vkGroupId,
      server_id: callbackServers.items[0].id,
    });
  }

  const botId = uuidv4();

  const secret = uuidv4().split('-').join('');

  botFather.create({
    botId,
    vkGroupId,
    vkGroupAccessToken: token,
    secret,
    confirmation: confirmation.code,
  });

  const [newCallbackServer, newBot] = await Promise.all([
    vk.api('groups.addCallbackServer', {
      group_id: vkGroupId,
      url: `${DOMAIN}/${botId}`,
      title: 'VK-BC-1',
      secret_key: secret,
    }),
    db.bots.create({
      botId,
      vkGroupId,
      vkGroupAccessToken: token,
      secret,
      confirmation: confirmation.code,
    }),
    users.addBot({
      userId: oAuthResponse.state,
      botId,
    }),
  ]);

  await vk.api('groups.setCallbackSettings', {
    group_id: vkGroupId,
    server_id: newCallbackServer.server_id,
    api_version: '5.101',
    message_new: 1,

  });

  return {
    botId: newBot.botId,
  };
});
