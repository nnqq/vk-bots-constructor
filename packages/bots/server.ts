import { hemera } from '../lib/hemera';
import { path as getGroupsPath, handler as getGroupsHandler } from './hemeraRoutes/getGroups';

hemera.add(getGroupsPath, getGroupsHandler);
