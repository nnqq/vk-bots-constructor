import mongoose from 'mongoose';
import { botSchema } from './schemas/bot';

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
