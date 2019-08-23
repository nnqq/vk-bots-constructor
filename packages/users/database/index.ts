import { model, Model, Document } from 'mongoose';
import { userSchema } from './schemas/user';

export interface IUser extends Document {
  userId: string;
  token: string;
  vkUserAccessToken: string;
  vkUserId: number;
  botIds: string[];
}

export const db: {
  users: Model<IUser>,
} = {
  users: model('User', userSchema),
};
