import { handlerDecorator } from '../../../lib/decorators/handlerDecorator';
import { db } from '../../database';
import { IParams, IResponse } from './interfaces';

export const handler = handlerDecorator(async (params: IParams): Promise<IResponse> => {
  const {
    count = 100, offset = 0, ...query
  } = params;

  const [keywords, totalCount] = await Promise.all([
    db.keywords.find(query, ['-botId', '-_id', '-__v'], {
      limit: count,
      skip: offset,
    }).lean(),
    db.keywords.countDocuments(query),
  ]);

  return {
    totalCount,
    count: keywords.length,
    offset,
    botId: params.botId,
    keywords,
  };
});
