import { IHemeraPath } from '../../lib/hemera';
import { handlerDecorator } from '../../lib/decorators/handlerDecorator';
import { db } from '../database/client';

export const path: IHemeraPath = {
  topic: 'keywords',
  cmd: 'deleteKeyword',
};

export interface IParamsBase {
  keywordId: string;
}

export interface IParams extends IParamsBase {
  botId: string;
}

export interface IResponse {
  deletedCount: number;
}

export const handler = handlerDecorator(async (params: IParams): Promise<IResponse> => {
  const { n } = await db.keywords.deleteOne(params);

  if (typeof n === 'undefined') {
    throw new Error('Can\'t delete Keyword');
  }

  return {
    deletedCount: n,
  };
});
