import { handlerDecorator, Vk } from '@nnqq/vk-bots-constructor-lib';
import { db } from '../../database';
import { botFather } from '../../helpers/BotFather';
import { events } from '../../../events';
import { keywords } from '../../../keywords';
import { DOMAIN } from '../../constants';
import { users } from '../../../users';
import { IParams, IResponse } from './interfaces';

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
  const { botId, userId } = params;

  botFather.killBot({ botId });

  const bot = await db.bots.findOne({ botId }).lean();

  if (!bot) {
    throw new Error(`Bot with botId=${botId} not found`);
  }

  const { vkGroupId, vkGroupAccessToken } = bot;

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

  const [
    deletedBots, deletedEvents, deletedKeywords, deletedBotsFromProfile, deleteCbServerStatus,
  ] = await Promise.all([
    db.bots.deleteOne({ botId }),
    events.deleteAllEvents({ botId }),
    keywords.deleteAllKeywords({ botId }),
    users.deleteBot({ botId, userId }),
    ...deleteCallbackServer,
  ]);

  return {
    deletedBotsCount: deletedBots.n || 0,
    deletedEventsCount: deletedEvents.deletedCount,
    deletedKeywordsCount: deletedKeywords.deletedCount,
    deletedBotsFromProfile: deletedBotsFromProfile.deletedCount,
    isCbServerDeleted: deleteCbServerStatus === 1,
  };
});
