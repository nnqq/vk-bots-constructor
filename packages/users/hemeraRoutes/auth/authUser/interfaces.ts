import { IHemeraPath } from '../../../../lib/hemera';
import { IUser } from '../../../database';

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
