import { IHemeraPath } from '../../../lib/hemera';
import { EnumKeywordRules } from '../../interfaces';
import { IKeyword } from '../../database';

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
  botId: string;
  keywords: IKeyword[];
}
