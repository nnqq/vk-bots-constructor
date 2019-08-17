import { Schema } from 'mongoose';
import uuidv4 from 'uuid/v4';

export const eventSchema = new Schema({
  eventId: {
    type: String,
    default: uuidv4,
  },
  botId: {
    type: String,
    required: true,
  },
  trigger: {
    type: String,
    enum: ['message_allow', 'message_deny', 'group_join', 'group_leave'],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  isEnabled: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
})
  .index({
    botId: 1,
    trigger: 1,
  }, {
    unique: true,
  });
