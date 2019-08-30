import { IHemeraPath } from '@nnqq/vk-bots-constructor-lib';

export const path: IHemeraPath = {
  topic: 'botsPubSub',
  cmd: 'refreshBot',
  pubsub$: true,
};

export interface IParams {
  botId: string;
}

export type IResponse = void;
