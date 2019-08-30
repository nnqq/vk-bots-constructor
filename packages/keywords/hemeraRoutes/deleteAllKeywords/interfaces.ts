import { IHemeraPath } from '@nnqq/vk-bots-constructor-lib';

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
