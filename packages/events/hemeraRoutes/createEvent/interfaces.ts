import { IHemeraPath } from '@nnqq/vk-bots-constructor-lib';
import { EnumTriggers } from '../../interfaces';

export const path: IHemeraPath = {
  topic: 'events',
  cmd: 'createEvent',
};

export interface IParamsBase {
  trigger: EnumTriggers;
  message: string;
  isEnabled?: boolean;
}

export interface IParams extends IParamsBase {
  botId: string;
}

export interface IResponse {
  eventId: string;
}
