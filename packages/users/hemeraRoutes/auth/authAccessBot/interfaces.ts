import { IHemeraPath } from '../../../../lib/hemera';
import { IUser } from '../../../database';

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
  credentials: IUser | {};
}
