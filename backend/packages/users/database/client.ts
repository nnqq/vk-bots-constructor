import mongoose from 'mongoose';
import { userSchema } from './schemas/user';

export interface IUser extends mongoose.Document {
  userId: string;
  token: string;
  vkUserAccessToken: string;
  vkUserId: number;
  botIds: string[];
}

export const db: {
  users: mongoose.Model<IUser>,
} = {
  users: mongoose.model('User', userSchema),
};
