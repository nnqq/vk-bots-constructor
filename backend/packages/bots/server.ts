import mongoose from 'mongoose';
import { hemera } from '../lib/hemera';
import { botFather } from './helpers/BotFather';
import { logger } from '../lib/logger';
import { mongoConnect } from '../lib/mongo';
import { path as getGroupsPath, handler as getGroupsHandler } from './hemeraRoutes/getGroups';
import { path as createBotPath, handler as createBotHandler } from './hemeraRoutes/createBot';
import { path as getBotConfigPath, handler as getBotConfigHandler } from './hemeraRoutes/getBotConfig';
import { path as refreshBotPath, handler as refreshBotHandler } from './hemeraRoutes/refreshBot';
import { path as deleteBotPath, handler as deleteBotHandler } from './hemeraRoutes/deleteBot';

hemera.registerRoutes([{
  path: getGroupsPath,
  handler: getGroupsHandler,
}, {
  path: createBotPath,
  handler: createBotHandler,
}, {
  path: getBotConfigPath,
  handler: getBotConfigHandler,
}, {
  path: refreshBotPath,
  handler: refreshBotHandler,
}, {
  path: deleteBotPath,
  handler: deleteBotHandler,
}]);

(async () => {
  try {
    await mongoConnect(mongoose);

    await hemera.ready();

    await botFather.initBotFather();
    logger.info('BotFather started and loaded all active bots');
  } catch (e) {
    logger.fatal(e);
    process.exit(1);
  }
})();
