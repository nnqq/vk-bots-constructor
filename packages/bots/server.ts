import { connect } from 'mongoose';
import { hemera, logger, mongoConnect } from '@nnqq/vk-bots-constructor-lib';
import { botFather } from './helpers/BotFather';

import { handler as getGroupsHandler } from './hemeraRoutes/getGroups';
import { path as getGroupsPath } from './hemeraRoutes/getGroups/interfaces';

import { handler as createBotHandler } from './hemeraRoutes/createBot';
import { path as createBotPath } from './hemeraRoutes/createBot/interfaces';

import { handler as getBotConfigHandler } from './hemeraRoutes/getBotConfig';
import { path as getBotConfigPath } from './hemeraRoutes/getBotConfig/interfaces';

import { handler as refreshBotHandler } from './hemeraRoutes/refreshBot';
import { path as refreshBotPath } from './hemeraRoutes/refreshBot/interfaces';

import { handler as deleteBotHandler } from './hemeraRoutes/deleteBot';
import { path as deleteBotPath } from './hemeraRoutes/deleteBot/interfaces';

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
    await mongoConnect(connect);

    await hemera.ready();

    await botFather.initBotFather();
    logger.info('BotFather started and loaded all active bots');
  } catch (e) {
    logger.fatal(e);
    process.exit(1);
  }
})();
