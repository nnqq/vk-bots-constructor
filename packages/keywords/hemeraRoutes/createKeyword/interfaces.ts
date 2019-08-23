import { IHemeraPath } from '../../../lib/hemera';
import { EnumKeywordRules } from '../../interfaces';

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
