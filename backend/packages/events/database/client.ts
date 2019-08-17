import mongoose from 'mongoose';
import { eventSchema } from './schemas/event';
import { EnumTriggers } from '../interfaces';

export interface IEvent extends mongoose.Document {
  eventId: string;
  botId: string;
  trigger: EnumTriggers;
  message: string;
  isEnabled: boolean;
}

export const db: {
  events: mongoose.Model<IEvent>,
} = {
  events: mongoose.model('Event', eventSchema),
};
