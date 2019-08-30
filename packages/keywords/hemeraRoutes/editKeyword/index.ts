import { handlerDecorator } from '@nnqq/vk-bots-constructor-lib';
import { db } from '../../database';
import { bots } from '../../../bots';
import { IParams, IResponse } from './interfaces';

export const handler = handlerDecorator(async (params: IParams): Promise<IResponse> => {
  const { botId, keywordId, ...updateFields } = params;

  const { nModified } = await db.keywords.updateOne({
    botId,
    keywordId,
  }, updateFields);

  if (nModified) {
    await bots.refreshBot({ botId });
  }

  return {
    updatedCount: nModified,
  };
});
