import { IHemeraPath } from '../../lib/hemera';
import { handlerDecorator } from '../../lib/decorators/handlerDecorator';
import { db } from '../database/client';
import { EnumTriggers } from '../interfaces';
import { bots } from '../../bots/client';

export const path: IHemeraPath = {
  topic: 'events',
  cmd: 'editEvent',
};

export interface IParamsBase {
  eventId: string;
  trigger?: EnumTriggers;
  message?: string;
  isEnabled?: boolean;
}

export interface IParams extends IParamsBase {
  botId: string;
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

  if (nModified) {
    await bots.refreshBot({ botId });
  }

  return {
    updatedCount: nModified,
  };
});
