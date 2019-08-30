import { handlerDecorator } from '@nnqq/vk-bots-constructor-lib';
import { db } from '../../database';
import { IParams, IResponse } from './interfaces';

export const handler = handlerDecorator(async (params: IParams): Promise<IResponse> => {
  const { botId } = params;

  const events = await db.events.find(params, ['-botId', '-_id', '-__v']).lean();

  return {
    botId,
    events,
  };
});
