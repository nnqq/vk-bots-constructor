import { IHemeraPath } from '../../../lib/hemera';
import { EnumTriggers } from '../../interfaces';

export const path: IHemeraPath = {
  topic: 'events',
  cmd: 'editEvent',
};

export interface IParamsBase {
  eventId: string;
  trigger?: EnumTriggers;
  message?: string;
  isEnabled?: boolean;
}

export interface IParams extends IParamsBase {
  botId: string;
}

export interface IResponse {
  updatedCount: number;
}
