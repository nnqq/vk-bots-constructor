import { Schema } from 'mongoose';
import uuidv4 from 'uuid/v4';

export const botSchema = new Schema({
  botId: {
    type: String,
    default: uuidv4,
  },
  vkGroupId: {
    type: Number,
    required: true,
  },
  vkGroupAccessToken: {
    type: String,
    required: true,
  },
  secret: {
    type: String,
    required: true,
  },
  confirmation: {
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
  });
