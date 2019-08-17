import { IHemeraPath } from '../../lib/hemera';
import { handlerDecorator } from '../../lib/decorators/handlerDecorator';
import { db } from '../database/client';
import { botFather } from '../helpers/BotFather';
import { events } from '../../events/client';
import { keywords } from '../../keywords/client';
import { Vk } from '../../lib/Vk';
import { DOMAIN } from '../constants';

export const path: IHemeraPath = {
  topic: 'bots',
  cmd: 'deleteBot',
};

export interface IParams {
  botId: string;
}

export interface IResponse {
  deletedBotsCount: number;
  deletedEventsCount: number;
  deletedKeywordsCount: number;
  isCbServerDeleted: boolean;
}

interface IVkCbServer {
  /* eslint-disable camelcase */
  id: number;
  title: string;
  creator_id: number;
  url: string;
  secret_key: string;
  status: 'unconfigured' | 'failed' | 'wait' | 'ok';
  /* eslint-enable camelcase */
}

interface IVkCbServersResponse {
  count: number;
  items: IVkCbServer[];
}

export const handler = handlerDecorator(async (params: IParams): Promise<IResponse> => {
  const { botId } = params;

  botFather.killBot({ botId });

  const { vkGroupId, vkGroupAccessToken } = await db.bots.findOne({ botId }).lean();

  const vk = new Vk({
    token: vkGroupAccessToken,
  });

  const groupCbServers: IVkCbServersResponse = await vk.api('groups.getCallbackServers', {
    group_id: vkGroupId,
  });

  const botCbUrl = `${DOMAIN}/${botId}`;

  const botCbServer = groupCbServers.items.find(server => server.url === botCbUrl);

  const deleteCallbackServer = [];

  if (botCbServer) {
    deleteCallbackServer.push(vk.api('groups.deleteCallbackServer', {
      group_id: vkGroupId,
      server_id: botCbServer.id,
    }));
  }

  const [deletedBots, deletedEvents, deletedKeywords, deleteCbServerStatus] = await Promise.all([
    db.bots.deleteOne({ botId }),
    events.deleteAllEvents({ botId }),
    keywords.deleteAllKeywords({ botId }),
    ...deleteCallbackServer,
  ]);

  return {
    deletedBotsCount: deletedBots.n || 0,
    deletedEventsCount: deletedEvents.deletedCount,
    deletedKeywordsCount: deletedKeywords.deletedCount,
    isCbServerDeleted: deleteCbServerStatus === 1,
  };
});