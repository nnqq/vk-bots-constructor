import { handlerDecorator } from '@nnqq/vk-bots-constructor-lib';
import { db } from '../../../database';
import { IParams, IResponse } from './interfaces';

export const handler = handlerDecorator(async (params: IParams): Promise<IResponse> => {
  const { token } = params;

  const user = await db.users.findOne({ token }, ['-_id', '-__v']).lean();

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
