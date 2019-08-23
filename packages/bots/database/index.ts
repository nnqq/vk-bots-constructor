import { model, Model, Document } from 'mongoose';
import { botSchema } from './schemas/bot';

export interface IBot extends Document {
  botId: string;
  vkGroupId: number;
  vkGroupAccessToken: string;
  secret: string;
  confirmation: string;
  isEnabled: boolean;
}

export const db: {
  bots: Model<IBot>,
} = {
  bots: model('Bot', botSchema),
};
