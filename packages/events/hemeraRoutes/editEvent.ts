import { IHemeraPath } from '../../lib/hemera';
import { handlerDecorator } from '../../lib/decorators/handlerDecorator';
import { db } from '../database/client';
import { EnumTriggers } from '../interfaces';

export const path: IHemeraPath = {
  topic: 'events',
  cmd: 'editEvent',
};

export interface IParams {
  botId: string;
  eventId: string;
  trigger?: EnumTriggers;
  message?: string;
  isEnabled?: boolean;
}

export interface IResponse {
  updatedCount: number;
}

export const handler = handlerDecorator(async (params: IParams): Promise<IResponse> => {
  const { botId, eventId, ...updateFields } = params;

  const { nModified } = await db.events.updateOne({
    botId,
    eventId,
  }, updateFields);

  return {
    updatedCount: nModified,
  };
});
