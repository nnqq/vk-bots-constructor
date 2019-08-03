import { IHemeraPath } from '../../lib/hemera';
import { handlerDecorator } from '../../lib/decorators/handlerDecorator';
import { db } from '../database/client';

export const path: IHemeraPath = {
  topic: 'events',
  cmd: 'createEvent',
};

enum EnumTriggers {
  messageAllow = 'message_allow',
  messageDeny = 'message_deny',
  groupJoin = 'group_join',
  groupLeave = 'group_leave',
}

export interface IParams {
  botId: string;
  trigger: EnumTriggers;
  message: string;
}

export interface IResponse {
  eventId: string;
}

export const handler = handlerDecorator(async (params: IParams): Promise<IResponse> => {
  const { eventId } = await db.events.create(params);

  return {
    eventId,
  };
});
