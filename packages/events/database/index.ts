import { model, Model, Document } from 'mongoose';
import { eventSchema } from './schemas/event';
import { EnumTriggers } from '../interfaces';

export interface IEvent extends Document {
  eventId: string;
  botId: string;
  trigger: EnumTriggers;
  message: string;
  isEnabled: boolean;
}

export const db: {
  events: Model<IEvent>,
} = {
  events: model('Event', eventSchema),
};
