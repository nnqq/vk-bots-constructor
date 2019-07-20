import mongoose from 'mongoose';
import { userSchema } from './schemas/user';

// TODO на проде добавить autoIndex: false
mongoose.connect(`${process.env.MONGO_URI}`, {
  useNewUrlParser: true,
});

export interface IUser extends mongoose.Document {
  userId: string;
  token: string;
  vkUserAccessToken: string;
  vkId: number;
}

export const db: {
  users: mongoose.Model<IUser>,
} = {
  users: mongoose.model('User', userSchema),
};
