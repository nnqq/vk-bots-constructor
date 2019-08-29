import { handlerDecorator } from '@nnqq/vk-bots-constructor-lib';
import { db } from '../../database';
import { IParams, IResponse } from './interfaces';

export const handler = handlerDecorator(async (params: IParams): Promise<IResponse> => {
  const { userId, botId } = params;

  const { nModified } = await db.users.updateOne({ userId }, {
    $push: {
      botIds: botId,
    },
  });

  return {
    addedCount: nModified,
  };
});
