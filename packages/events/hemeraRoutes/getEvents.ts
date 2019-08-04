import { IHemeraPath } from '../../lib/hemera';
import { handlerDecorator } from '../../lib/decorators/handlerDecorator';
import { db, IEvent } from '../database/client';

export const path: IHemeraPath = {
  topic: 'events',
  cmd: 'getEvents',
};

export interface IParams {
  botId?: string;
}

export interface IResponse {
  events: IEvent[];
}

export const handler = handlerDecorator(async (params: IParams): Promise<IResponse> => {
  const { botId } = params;

  const query: IParams = {};

  if (botId) {
    query.botId = botId;
  }

  const events = await db.events.find(query, ['-_id', '-__v']);

  return {
    events,
  };
});
