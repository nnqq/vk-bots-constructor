import { IHemeraPath } from '../../../lib/hemera';

export const path: IHemeraPath = {
  topic: 'users',
  cmd: 'register',
};

export interface IParams {
  code: string;
}

export interface IResponse {
  token: string;
}
