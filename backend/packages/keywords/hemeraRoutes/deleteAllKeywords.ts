import { IHemeraPath } from '../../lib/hemera';
import { handlerDecorator } from '../../lib/decorators/handlerDecorator';
import { db } from '../database/client';

export const path: IHemeraPath = {
  topic: 'keywords',
  cmd: 'deleteAllKeywords',
};

export interface IParams {
  botId: string;
}

export interface IResponse {
  deletedCount: number;
}

export const handler = handlerDecorator(async (params: IParams): Promise<IResponse> => {
  const { botId } = params;

  const { n } = await db.keywords.deleteMany({ botId });

  if (typeof n === 'undefined') {
    throw new Error('Can\'t delete all Keywords');
  }

  return {
    deletedCount: n,
  };
});
