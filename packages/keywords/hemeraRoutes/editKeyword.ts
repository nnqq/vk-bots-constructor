import { IHemeraPath } from '../../lib/hemera';
import { handlerDecorator } from '../../lib/decorators/handlerDecorator';
import { db } from '../database/client';
import { EnumKeywordRules } from '../interfaces';

export const path: IHemeraPath = {
  topic: 'keywords',
  cmd: 'editKeyword',
};

export interface IParamsBase {
  keywordId: string;
  triggers?: string[];
  rule?: EnumKeywordRules;
  caseSensitive?: boolean;
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
  const { botId, keywordId, ...updateFields } = params;

  const { nModified } = await db.keywords.updateOne({
    botId,
    keywordId,
  }, updateFields);

  return {
    updatedCount: nModified,
  };
});
