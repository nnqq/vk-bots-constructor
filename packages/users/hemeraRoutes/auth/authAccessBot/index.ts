import { handlerDecorator } from '../../../../lib/decorators/handlerDecorator';
import { db } from '../../../database';
import { IParams, IResponse } from './interfaces';

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
    credentials: {},
  };
});
