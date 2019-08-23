import { IHemeraPath } from '../../../lib/hemera';

export const path: IHemeraPath = {
  topic: 'botsPubSub',
  cmd: 'refreshBot',
  pubsub$: true,
};

export interface IParams {
  botId: string;
}

export type IResponse = void;
