import { handlerDecorator } from '@nnqq/vk-bots-constructor-lib';
import { db } from '../../database';
import { botFather } from '../../helpers/BotFather';
import { handler as refreshBot } from '../refreshBot';
import { IParams, IResponse } from './interfaces';

export const handler = handlerDecorator(async (params: IParams): Promise<IResponse> => {
  const { botId, isEnabled } = params;

  const { nModified } = await db.bots.updateOne({
    botId,
  }, {
    isEnabled,
  });

  if (isEnabled) {
    await refreshBot({ params: { botId } });
  } else {
    botFather.killBot({ botId });
  }

  return {
    updatedCount: nModified,
  };
});
