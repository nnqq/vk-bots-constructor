import { IHemeraPath } from '../../../lib/hemera';
import { IEvent } from '../../database';

export const path: IHemeraPath = {
  topic: 'events',
  cmd: 'getEvents',
};

export interface IParams {
  botId: string;
  isEnabled?: boolean;
}

export interface IResponse {
  botId: string;
  events: IEvent[];
}
