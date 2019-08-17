import { IHemeraPath } from '../../lib/hemera';
import { handlerDecorator } from '../../lib/decorators/handlerDecorator';
import { db } from '../database/client';

export const path: IHemeraPath = {
  topic: 'users',
  cmd: 'addBot',
};

export interface IParams {
  userId: string;
  botId: string;
}

export interface IResponse {
  addedCount: number;
}

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
