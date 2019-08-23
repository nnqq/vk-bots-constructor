import { handlerDecorator } from '../../../lib/decorators/handlerDecorator';
import { db } from '../../database';
import { IParams, IResponse } from './interfaces';

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
