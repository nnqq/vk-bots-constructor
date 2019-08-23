import { IHemeraPath } from '../../../lib/hemera';

export const path: IHemeraPath = {
  topic: 'events',
  cmd: 'deleteEvent',
};

export interface IParamsBase {
  eventId: string;
}

export interface IParams extends IParamsBase {
  botId: string;
}

export interface IResponse {
  deletedCount: number;
}
