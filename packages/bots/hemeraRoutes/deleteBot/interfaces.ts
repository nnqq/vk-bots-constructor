import { IHemeraPath } from '@nnqq/vk-bots-constructor-lib';

export const path: IHemeraPath = {
  topic: 'bots',
  cmd: 'deleteBot',
};

export interface IParams {
  botId: string;
  userId: string;
}

export interface IResponse {
  deletedBotsCount: number;
  deletedEventsCount: number;
  deletedKeywordsCount: number;
  deletedBotsFromProfile: number;
  isCbServerDeleted: boolean;
}
