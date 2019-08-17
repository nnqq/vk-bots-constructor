import { IHemeraPath } from '../../lib/hemera';
import { handlerDecorator } from '../../lib/decorators/handlerDecorator';
import { db } from '../database/client';

export const path: IHemeraPath = {
  topic: 'events',
  cmd: 'deleteAllEvents',
};

export interface IParams {
  botId: string;
}

export interface IResponse {
  deletedCount: number;
}

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
