import { IHemeraPath } from '../../../lib/hemera';

export const path: IHemeraPath = {
  topic: 'users',
  cmd: 'addBot',
};

export interface IParams {
  userId: string;
  botId: string;
}

export interface IResponse {
  addedCount: number;
}
