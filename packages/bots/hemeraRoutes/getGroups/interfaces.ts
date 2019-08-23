import { IHemeraPath } from '../../../lib/hemera';

export const path: IHemeraPath = {
  topic: 'bots',
  cmd: 'getGroups',
};

export interface IParams {
  vkUserAccessToken: string;
}

export interface IResponse {
  groups: IGroup[];
}

interface IGroup {
  vkGroupId: number;
  botId: string | null;
  isEnabled: boolean | null;
}
