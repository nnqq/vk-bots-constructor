import { stringify } from 'querystring';
import fetch from 'node-fetch';
import {
  IOAuthError, isOAuthError, logger, handlerDecorator,
} from '@nnqq/vk-bots-constructor-lib';
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from '../../constants';
import { db } from '../../database';
import { IParams, IResponse } from './interfaces';

interface IOAuthSuccess {
  /* eslint-disable camelcase */
  access_token: string;
  expires_in: number;
  user_id: number;
  /* eslint-enable camelcase */
}

type IOAuthResponse = IOAuthSuccess | IOAuthError;

export const handler = handlerDecorator(async (params: IParams): Promise<IResponse> => {
  const { code } = params;

  const query = stringify({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: REDIRECT_URI,
    code,
  });

  const raw = await fetch(`https://oauth.vk.com/access_token?${query}`);

  const oAuthResponse: IOAuthResponse = await raw.json();

  if (isOAuthError(oAuthResponse)) {
    logger.error(oAuthResponse);
    throw new Error(oAuthResponse.error_description);
  }

  const user = await db.users.findOne({
    vkUserId: oAuthResponse.user_id,
  }).lean();

  if (user) {
    await db.users.updateOne({
      vkUserId: oAuthResponse.user_id,
    }, {
      vkUserAccessToken: oAuthResponse.access_token,
    });

    return {
      token: user.token,
    };
  }

  const newUser = await db.users.create({
    vkUserAccessToken: oAuthResponse.access_token,
    vkUserId: oAuthResponse.user_id,
  });

  return {
    token: newUser.token,
  };
});
