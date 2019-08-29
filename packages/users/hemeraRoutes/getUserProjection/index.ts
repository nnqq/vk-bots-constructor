import { handlerDecorator } from '@nnqq/vk-bots-constructor-lib';
import { db } from '../../database';
import { IParams, IResponse } from './interfaces';

interface IQuery {
  botIds?: string;
  vkUserAccessToken?: string;
  vkUserId?: number;
  userId?: string;
  token?: string;
}

export const handler = handlerDecorator(async (params: IParams): Promise<IResponse> => {
  const { projection = [], botId, ...restFields } = params;

  const query: IQuery = { ...restFields };

  if (typeof botId !== 'undefined') {
    query.botIds = botId;
  }

  return db.users.findOne(query, projection).lean();
});
