import { IHemeraPath } from '../../../lib/hemera';

export const path: IHemeraPath = {
  topic: 'bots',
  cmd: 'editBot',
};

export interface IParamsBase {
  isEnabled: boolean;
}

export interface IParams extends IParamsBase {
  botId: string;
}

export interface IResponse {
  updatedCount: number;
}
