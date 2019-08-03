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

export interface IResponse {
  count: number;
  items: number[];
}

export const handler = handlerDecorator(async (params: IParams): Promise<IResponse> => {
  const { vkUserAccessToken } = params;

  const vk = new Vk({
    token: vkUserAccessToken,
  });

  return vk.api('groups.get', {
    filter: 'admin',
    count: 1000,
  });
});
