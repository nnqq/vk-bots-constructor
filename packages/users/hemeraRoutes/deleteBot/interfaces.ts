import { IHemeraPath } from '../../../lib/hemera';

export const path: IHemeraPath = {
  topic: 'users',
  cmd: 'deleteBot',
};

export interface IParams {
  userId: string;
  botId: string;
}

export interface IResponse {
  deletedCount: number;
}
