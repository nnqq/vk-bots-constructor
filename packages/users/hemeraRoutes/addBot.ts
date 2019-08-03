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

export type IResponse = 'ok';

export const handler = handlerDecorator(async (params: IParams): Promise<IResponse> => {
  const { userId, botId } = params;

  const { nModified } = await db.users.updateOne({
    userId,
  }, {
    botIds: {
      $push: botId,
    },
  });

  if (nModified === 1) {
    return 'ok';
  }

  throw new Error('Can\'t add botId to User profile');
});
