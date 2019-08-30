import { IHemeraPath } from '@nnqq/vk-bots-constructor-lib';

export const path: IHemeraPath = {
  topic: 'events',
  cmd: 'deleteAllEvents',
};

export interface IParams {
  botId: string;
}

export interface IResponse {
  deletedCount: number;
}
