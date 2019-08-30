import { IHemeraPath } from '@nnqq/vk-bots-constructor-lib';
import { IResponse as IEvents } from '../../../events/hemeraRoutes/getEvents/interfaces';
import { IResponse as IKeywords } from '../../../keywords/hemeraRoutes/getKeywords/interfaces';

export const path: IHemeraPath = {
  topic: 'bots',
  cmd: 'getBotConfig',
};

export interface IParams {
  botId: string;
}

export type IResponse = IEvents & {
  keywords: IKeywords['keywords'];
};
