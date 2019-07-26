import mongoose from 'mongoose';
import { botSchema } from './schemas/bot';

// TODO на проде добавить autoIndex: false
mongoose.connect(`${process.env.MONGO_URI}`, {
  useNewUrlParser: true,
});

export interface IBot extends mongoose.Document {
  botId: string;
  vkGroupId: number;
  secret: string;
  isEnabled: boolean;
}

export const db: {
  bots: mongoose.Model<IBot>,
} = {
  bots: mongoose.model('Bot', botSchema),
};
