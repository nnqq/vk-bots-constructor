import { IHemeraPath } from '../../../lib/hemera';

export const path: IHemeraPath = {
  topic: 'bots',
  cmd: 'createBot',
};

export interface IParams {
  code: string;
  state: string;
}

export interface IResponse {
  botId: string;
}
