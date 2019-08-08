import { IHemeraPath } from '../../lib/hemera';
import { handlerDecorator } from '../../lib/decorators/handlerDecorator';
import { db } from '../database/client';
import { EnumKeywordRules } from '../interfaces';

export const path: IHemeraPath = {
  topic: 'keywords',
  cmd: 'createKeyword',
};

export interface IParams {
  botId: string;
  triggers: string[];
  rule?: EnumKeywordRules;
  caseSensitive?: boolean;
  message: string;
  isEnabled?: boolean;
}

export interface IResponse {
  keywordId: string;
}

export const handler = handlerDecorator(async (params: IParams): Promise<IResponse> => {
  const { keywordId } = await db.keywords.create(params);

  return {
    keywordId,
  };
});
