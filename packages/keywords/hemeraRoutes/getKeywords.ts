import { IHemeraPath } from '../../lib/hemera';
import { handlerDecorator } from '../../lib/decorators/handlerDecorator';
import { db, IKeyword } from '../database/client';
import { EnumKeywordRules } from '../interfaces';

export const path: IHemeraPath = {
  topic: 'keywords',
  cmd: 'getKeywords',
};

export interface IParams {
  botId: string;
  triggers?: string;
  rule?: EnumKeywordRules;
  caseSensitive?: boolean;
  message?: string;
  isEnabled?: boolean;
  count?: number;
  offset?: number;
}

export interface IResponse {
  totalCount: number;
  count: number;
  offset: number;
  keywords: IKeyword[];
}

export const handler = handlerDecorator(async (params: IParams): Promise<IResponse> => {
  const {
    count = 100, offset = 0, ...query
  } = params;

  const [keywords, totalCount] = await Promise.all([
    db.keywords.find(query, ['-_id', '-__v'], {
      limit: count,
      skip: offset,
    }),
    db.keywords.countDocuments(query),
  ]);

  return {
    totalCount,
    count: keywords.length,
    offset,
    keywords,
  };
});
