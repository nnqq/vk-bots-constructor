import { Schema } from 'mongoose';
import uuidv4 from 'uuid/v4';

export const keywordSchema = new Schema({
  keywordId: {
    type: String,
    default: uuidv4,
  },
  botId: {
    type: String,
    required: true,
  },
  triggers: {
    type: [String],
    required: true,
  },
  rule: {
    type: String,
    enum: ['contain', 'equal'],
    default: 'contain',
  },
  caseSensitive: {
    type: Boolean,
    default: false,
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
  });
