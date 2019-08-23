import { handlerDecorator } from '../../../lib/decorators/handlerDecorator';
import { db } from '../../database';
import { bots } from '../../../bots';
import { IParams, IResponse } from './interfaces';

export const handler = handlerDecorator(async (params: IParams): Promise<IResponse> => {
  const { botId } = params;

  const { eventId } = await db.events.create(params);

  await bots.refreshBot({ botId });

  return {
    eventId,
  };
});
