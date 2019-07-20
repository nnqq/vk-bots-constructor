import { stringify } from 'querystring';
import fetch from 'node-fetch';
import { IHemeraPath } from '../../lib/hemera';
import { handlerDecorator } from '../../lib/decorators/handlerDecorator';
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from '../constants';
import { db } from '../database/client';

export const path: IHemeraPath = {
  topic: 'users',
  cmd: 'register',
};

export interface IParams {
  code: string;
}

export interface IResponse {
  token: string;
}

interface IOAuthSuccess {
  /* eslint-disable camelcase */
  access_token: string;
  expires_in: number;
  user_id: number;
  /* eslint-enable camelcase */
}

interface IOAuthError {
  error: string;
  // eslint-disable-next-line camelcase
  error_description: string;
}

type IOAuthResponse = IOAuthSuccess | IOAuthError;

const isOAuthError = (response: IOAuthResponse): response is IOAuthError => !!(
  (response as IOAuthError).error && (response as IOAuthError).error_description);

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
    throw new Error(oAuthResponse.error_description);
  }

  const user = await db.users.findOne({
    vkId: oAuthResponse.user_id,
  }).lean();

  if (user) {
    await db.users.updateOne({
      vkId: oAuthResponse.user_id,
    }, {
      vkUserAccessToken: oAuthResponse.access_token,
    });

    return {
      token: user.token,
    };
  }

  const newUser = await db.users.create({
    vkUserAccessToken: oAuthResponse.access_token,
    vkId: oAuthResponse.user_id,
  });

  return {
    token: newUser.token,
  };
});
