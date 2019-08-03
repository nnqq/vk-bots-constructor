import mongoose from 'mongoose';
import { MONGO_URI } from '../constants';
import { eventSchema } from './schemas/event';

// TODO на проде добавить autoIndex: false
if (MONGO_URI) {
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
  });
}

export interface IEvent extends mongoose.Document {
  eventId: string;
  botId: string;
  trigger: string;
  message: string;
  isEnabled: boolean;
}

export const db: {
  events: mongoose.Model<IEvent>,
} = {
  events: mongoose.model('Event', eventSchema),
};
