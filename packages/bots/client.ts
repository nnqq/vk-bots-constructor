import { hemera } from '../lib/hemera';
import {
  IParams as getGroupsParams,
  IResponse as getGroupsResponse,
  path as getGroupsPath,
} from './hemeraRoutes/getGroups';

export const bots = {
  getGroups(params: getGroupsParams): Promise<getGroupsResponse> {
    return hemera.send(getGroupsPath, params);
  },
};
