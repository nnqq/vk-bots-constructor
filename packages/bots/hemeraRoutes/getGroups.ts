import { IHemeraPath } from '../../lib/hemera';
import { handlerDecorator } from '../../lib/decorators/handlerDecorator';
import { Vk } from '../../lib/Vk';

export const path: IHemeraPath = {
  topic: 'bots',
  cmd: 'getGroups',
};

export interface IParams {
  vkUserAccessToken: string;
}

// TODO fix any
export interface IResponse {
  token: string;
}

interface IGroupsGetResponse {
  response: {
    count: number;
    items: string[];
  }
}

/*
{
  "error": {
    "error_code": 5,
    "error_msg": "User authorization failed: no access_token passed.",
    "request_params": [
      {
        "key": "filter",
        "value": "admin"
      },
    ]
  }
}
*/

export const handler = handlerDecorator(async (params: IParams): Promise<any> => {
  const { vkUserAccessToken } = params;

  const vk = new Vk({
    token: vkUserAccessToken,
  });

  console.error('TOKEN -->>', vkUserAccessToken);

  // TODO засунуть внутрь класса логику что вк ответил ошибкой
  const groupsGetResponse: IGroupsGetResponse = await vk.api('groups.get', {
    filter: 'admin',
    count: 1000,
  });

  if (!groupsGetResponse.response) {
    throw new Error('Can\'t get admin groups');
  }

  return groupsGetResponse.response;
});
