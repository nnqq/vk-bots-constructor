import { IHemeraPath } from '@nnqq/vk-bots-constructor-lib';
import { EnumKeywordRules } from '../../interfaces';

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
