import { IHemeraPath } from '../../../lib/hemera';

export const path: IHemeraPath = {
  topic: 'keywords',
  cmd: 'deleteKeyword',
};

export interface IParamsBase {
  keywordId: string;
}

export interface IParams extends IParamsBase {
  botId: string;
}

export interface IResponse {
  deletedCount: number;
}
