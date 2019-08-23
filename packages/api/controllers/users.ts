import { Request } from '@hapi/hapi';
import { users } from '../../users';
import { IParams as IRegisterUserParams } from '../../users/hemeraRoutes/register/interfaces';

interface IRegisterUser {
  query: IRegisterUserParams;
}

type IRegisterUserRequest = Request & IRegisterUser;

export const controllers = {
  registerUser(req: IRegisterUserRequest) {
    if (Array.isArray(req.query.code)) {
      throw new Error('Code can\'t be an Array');
    }

    return users.register({
      code: req.query.code,
    });
  },
};
