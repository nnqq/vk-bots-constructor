import { Schema } from 'mongoose';
import uuidv4 from 'uuid/v4';

export const userSchema = new Schema({
  userId: {
    type: String,
    default: uuidv4,
  },
  token: {
    type: String,
    default: uuidv4,
  },
  vkUserAccessToken: {
    type: String,
    required: true,
  },
  vkId: {
    type: Number,
    required: true,
  },
});
