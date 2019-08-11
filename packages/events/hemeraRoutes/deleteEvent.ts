import { IHemeraPath } from '../../lib/hemera';
import { handlerDecorator } from '../../lib/decorators/handlerDecorator';
import { db } from '../database/client';

export const path: IHemeraPath = {
  topic: 'events',
  cmd: 'deleteEvent',
};

export interface IParamsBase {
  eventId: string;
}

export interface IParams extends IParamsBase {
  botId: string;
}

export interface IResponse {
  deletedCount: number;
}

export const handler = handlerDecorator(async (params: IParams): Promise<IResponse> => {
  const { botId, eventId } = params;

  const { n } = await db.events.deleteOne({
    botId,
    eventId,
  });

  if (typeof n === 'undefined') {
    throw new Error('Can\'t delete Event');
  }

  return {
    deletedCount: n,
  };
});
