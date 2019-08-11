import mongoose from 'mongoose';
import { MONGO_URI } from '../constants';
import { botSchema } from './schemas/bot';

// TODO на проде добавить autoIndex: false
if (MONGO_URI) {
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
  });
}

export interface IBot extends mongoose.Document {
  botId: string;
  vkGroupId: number;
  vkGroupAccessToken: string;
  secret: string;
  confirmation: string;
  isEnabled: boolean;
}

export const db: {
  bots: mongoose.Model<IBot>,
} = {
  bots: mongoose.model('Bot', botSchema),
};
