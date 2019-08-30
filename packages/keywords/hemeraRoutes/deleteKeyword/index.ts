import { handlerDecorator } from '@nnqq/vk-bots-constructor-lib';
import { db } from '../../database';
import { bots } from '../../../bots';
import { IParams, IResponse } from './interfaces';

export const handler = handlerDecorator(async (params: IParams): Promise<IResponse> => {
  const { botId } = params;

  const { n } = await db.keywords.deleteOne(params);

  if (typeof n === 'undefined') {
    throw new Error('Can\'t delete Keyword');
  }

  if (n) {
    await bots.refreshBot({ botId });
  }

  return {
    deletedCount: n,
  };
});
