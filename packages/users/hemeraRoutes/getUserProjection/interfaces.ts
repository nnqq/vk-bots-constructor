import { IHemeraPath } from '@nnqq/vk-bots-constructor-lib';
import { IUser } from '../../database';

export const path: IHemeraPath = {
  topic: 'users',
  cmd: 'getUserProjection',
};

export interface IParams {
  projection: string[];
  botId?: string;
  vkUserAccessToken?: string;
  vkUserId?: number;
  userId?: string;
  token?: string;
}

export type IResponse = IUser;
