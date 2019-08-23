import { handlerDecorator } from '../../../lib/decorators/handlerDecorator';
import { db } from '../../database';
import { bots } from '../../../bots';
import { IParams, IResponse } from './interfaces';

export const handler = handlerDecorator(async (params: IParams): Promise<IResponse> => {
  const { botId, eventId } = params;

  const { n } = await db.events.deleteOne({
    botId,
    eventId,
  });

  if (typeof n === 'undefined') {
    throw new Error('Can\'t delete Event');
  }

  if (n) {
    await bots.refreshBot({ botId });
  }

  return {
    deletedCount: n,
  };
});
