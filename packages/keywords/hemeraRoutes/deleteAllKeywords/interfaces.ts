import { IHemeraPath } from '../../../lib/hemera';

export const path: IHemeraPath = {
  topic: 'keywords',
  cmd: 'deleteAllKeywords',
};

export interface IParams {
  botId: string;
}

export interface IResponse {
  deletedCount: number;
}
