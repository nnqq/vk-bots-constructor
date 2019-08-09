import { hemera } from '../lib/hemera';
import { path as getGroupsPath, handler as getGroupsHandler } from './hemeraRoutes/getGroups';
import { path as createBotPath, handler as createBotHandler } from './hemeraRoutes/createBot';
import { path as getBotConfigPath, handler as getBotConfigHandler } from './hemeraRoutes/getBotConfig';

hemera.add(getGroupsPath, getGroupsHandler);
hemera.add(createBotPath, createBotHandler);
hemera.add(getBotConfigPath, getBotConfigHandler);
