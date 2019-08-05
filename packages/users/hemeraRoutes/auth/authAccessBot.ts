import { IHemeraPath } from '../../../lib/hemera';
import { handlerDecorator } from '../../../lib/decorators/handlerDecorator';
import { db, IUser } from '../../database/client';

export const path: IHemeraPath = {
  topic: 'users',
  cmd: 'authAccessBot',
};

export interface IParams {
  token: string;
  botId: string;
}

export interface IResponse {
  isValid: boolean;
  credentials?: IUser;
}

export const handler = handlerDecorator(async (params: IParams): Promise<IResponse> => {
  const { token, botId } = params;

  const user = await db.users.findOne({ token }, ['-_id', '-__v']).lean();

  if (user && user.botIds.includes(botId)) {
    return {
      isValid: true,
      credentials: user,
    };
  }

  return {
    isValid: false,
  };
});
