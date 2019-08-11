import mongoose from 'mongoose';
import { MONGO_URI } from '../constants';
import { keywordSchema } from './schemas/keyword';
import { EnumKeywordRules } from '../interfaces';

// TODO на проде добавить autoIndex: false
if (MONGO_URI) {
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
  });
}

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
