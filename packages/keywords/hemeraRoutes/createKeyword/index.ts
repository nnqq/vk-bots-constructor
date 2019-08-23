import { handlerDecorator } from '../../../lib/decorators/handlerDecorator';
import { db } from '../../database';
import { bots } from '../../../bots';
import { IParams, IResponse } from './interfaces';

export const handler = handlerDecorator(async (params: IParams): Promise<IResponse> => {
  const { botId } = params;

  const { keywordId } = await db.keywords.create(params);

  await bots.refreshBot({ botId });

  return {
    keywordId,
  };
});
