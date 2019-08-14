import { hemera } from '../lib/hemera';
import { botFather } from './helpers/BotFather';
import { logger } from '../lib/logger';
import { path as getGroupsPath, handler as getGroupsHandler } from './hemeraRoutes/getGroups';
import { path as createBotPath, handler as createBotHandler } from './hemeraRoutes/createBot';
import { path as getBotConfigPath, handler as getBotConfigHandler } from './hemeraRoutes/getBotConfig';
import { path as refreshBotPath, handler as refreshBotHandler } from './hemeraRoutes/refreshBot';

hemera.add(getGroupsPath, getGroupsHandler);
hemera.add(createBotPath, createBotHandler);
hemera.add(getBotConfigPath, getBotConfigHandler);
hemera.add(refreshBotPath, refreshBotHandler);

hemera.ready()
  .then(() => botFather.initBotFather())
  .then(() => {
    logger.info('BotFather started and loaded all active bots');
  })
  .catch((e) => {
    logger.fatal('Error at BotFather: ', e);
    process.exit(1);
  });
