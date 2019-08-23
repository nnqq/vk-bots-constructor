import { model, Model, Document } from 'mongoose';
import { keywordSchema } from './schemas/keyword';
import { EnumKeywordRules } from '../interfaces';

export interface IKeyword extends Document {
  keywordId: string;
  botId: string;
  triggers: string[];
  rule: EnumKeywordRules;
  caseSensitive: boolean;
  message: string;
  isEnabled: boolean;
}

export const db: {
  keywords: Model<IKeyword>,
} = {
  keywords: model('Keyword', keywordSchema),
};
