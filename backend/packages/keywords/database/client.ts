import mongoose from 'mongoose';
import { keywordSchema } from './schemas/keyword';
import { EnumKeywordRules } from '../interfaces';

export interface IKeyword extends mongoose.Document {
  keywordId: string;
  botId: string;
  triggers: string[];
  rule: EnumKeywordRules;
  caseSensitive: boolean;
  message: string;
  isEnabled: boolean;
}

export const db: {
  keywords: mongoose.Model<IKeyword>,
} = {
  keywords: mongoose.model('Keyword', keywordSchema),
};
