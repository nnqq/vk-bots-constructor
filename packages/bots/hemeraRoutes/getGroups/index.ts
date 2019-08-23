import { handlerDecorator } from '../../../lib/decorators/handlerDecorator';
import { Vk } from '../../../lib/Vk';
import { db } from '../../database';
import { IParams, IResponse } from './interfaces';

interface IVkGroups {
  count: number;
  items: number[];
}

type TypeVkGroupId = number;

interface IMapBotsValue {
  botId: string;
  isEnabled: boolean;
}

export const handler = handlerDecorator(async (params: IParams): Promise<IResponse> => {
  const { vkUserAccessToken } = params;

  const vk = new Vk({
    token: vkUserAccessToken,
  });

  const groups: IVkGroups = await vk.api('groups.get', {
    filter: 'admin',
    count: 1000,
  });

  const bots = await db.bots.find({
    vkGroupId: {
      $in: groups.items,
    },
  }, ['vkGroupId', 'botId', 'isEnabled']);

  const mapBots: Map<TypeVkGroupId, IMapBotsValue> = new Map();

  bots.forEach(({ vkGroupId, botId, isEnabled }) => {
    mapBots.set(vkGroupId, {
      botId,
      isEnabled,
    });
  });

  return {
    groups: groups.items.map((vkGroupId) => {
      let botId = null;
      let isEnabled = null;

      if (mapBots.has(vkGroupId)) {
        const bot = mapBots.get(vkGroupId)!;

        ({ botId, isEnabled } = bot);
      }

      return {
        vkGroupId,
        botId,
        isEnabled,
      };
    }),
  };
});
