import { handlerDecorator } from '@nnqq/vk-bots-constructor-lib';
import { db } from '../../database';
import { IParams, IResponse } from './interfaces';

export const handler = handlerDecorator(async (params: IParams): Promise<IResponse> => {
  const { botId } = params;

  const { n } = await db.events.deleteMany({ botId });

  if (typeof n === 'undefined') {
    throw new Error('Can\'t delete all Events');
  }

  return {
    deletedCount: n,
  };
});
