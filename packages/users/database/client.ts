import mongoose from 'mongoose';
import { MONGO_URI } from '../constants';
import { userSchema } from './schemas/user';

// TODO на проде добавить autoIndex: false
if (MONGO_URI) {
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
  });
}

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
