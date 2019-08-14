import { IHemeraPath } from '../../lib/hemera';
import { handlerDecorator } from '../../lib/decorators/handlerDecorator';
import { db } from '../database/client';
import { EnumKeywordRules } from '../interfaces';
import { bots } from '../../bots/client';

export const path: IHemeraPath = {
  topic: 'keywords',
  cmd: 'createKeyword',
};

export interface IParamsBase {
  triggers: string[];
  rule?: EnumKeywordRules;
  caseSensitive?: boolean;
  message: string;
  isEnabled?: boolean;
}

export interface IParams extends IParamsBase {
  botId: string;
}

export interface IResponse {
  keywordId: string;
}

export const handler = handlerDecorator(async (params: IParams): Promise<IResponse> => {
  const { botId } = params;

  const { keywordId } = await db.keywords.create(params);

  await bots.refreshBot({ botId });

  return {
    keywordId,
  };
});
