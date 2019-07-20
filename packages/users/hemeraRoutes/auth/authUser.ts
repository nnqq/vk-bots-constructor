import { IHemeraPath } from '../../../lib/hemera';
import { handlerDecorator } from '../../../lib/decorators/handlerDecorator';
import { db, IUser } from '../../database/client';

export const path: IHemeraPath = {
  topic: 'users',
  cmd: 'authUser',
};

export interface IParams {
  token: string;
}

export interface IResponse {
  isValid: boolean;
  credentials?: IUser;
}

export const handler = handlerDecorator(async (params: IParams): Promise<IResponse> => {
  const { token } = params;

  const user = await db.users.findOne({ token }, ['-_id', '-__v']);

  if (user) {
    return {
      isValid: true,
      credentials: user,
    };
  }

  return {
    isValid: false,
  };
});
