import { IHemeraPath } from '../../lib/hemera';
import { handlerDecorator } from '../../lib/decorators/handlerDecorator';
import { db, IEvent } from '../database/client';

export const path: IHemeraPath = {
  topic: 'events',
  cmd: 'getEvents',
};

export interface IParams {
  botId: string;
  isEnabled?: boolean;
}

export interface IResponse {
  botId: string;
  events: IEvent[];
}

export const handler = handlerDecorator(async (params: IParams): Promise<IResponse> => {
  const { botId } = params;

  const events = await db.events.find(params, ['-botId', '-_id', '-__v']).lean();

  return {
    botId,
    events,
  };
});
