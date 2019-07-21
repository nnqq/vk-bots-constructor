import fetch from 'node-fetch';
import { stringify } from 'querystring';
import { IHemeraPath } from '../../lib/hemera';
import { handlerDecorator } from '../../lib/decorators/handlerDecorator';
import { Vk } from '../../lib/Vk';
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from '../constants';
import { IOAuthError, isOAuthError } from '../../lib/helpers';

export const path: IHemeraPath = {
  topic: 'bots',
  cmd: 'createBot',
};

export interface IParams {
  code: string;
}

// TODO fix any
export type IResponse = any;

interface IOAuthSuccess {
  /* eslint-disable camelcase */
  access_token_XXXX: string; // access_token_XXXX where XXXX is groupId
  expires_in: number;
  /* eslint-enable camelcase */
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
    throw new Error(oAuthResponse.error_description);
  }

  delete oAuthResponse.expires_in;

  const [accessTokenXxxx, token] = Object.entries(oAuthResponse)[0][0];

  const groupId = accessTokenXxxx.split('_').slice(-1);

  // TODO подумать где хранить токены групп, в базе рядом с юзером или в тарантуле

  const vk = new Vk({
    token,
  });

  await Promise.all([
    vk.api('groups.addCallbackServer', {

    })
  ]);
});
