import { connect } from 'mongoose';
import { hemera } from '../lib/hemera';
import { mongoConnect } from '../lib/mongo';

import { handler as registerHandler } from './hemeraRoutes/register';
import { path as registerPath } from './hemeraRoutes/register/interfaces';

import { handler as authUserHandler } from './hemeraRoutes/auth/authUser';
import { path as authUserPath } from './hemeraRoutes/auth/authUser/interfaces';

import { handler as authAccessBotHandler } from './hemeraRoutes/auth/authAccessBot';
import { path as authAccessBotPath } from './hemeraRoutes/auth/authAccessBot/interfaces';

import { handler as addBotHandler } from './hemeraRoutes/addBot';
import { path as addBotPath } from './hemeraRoutes/addBot/interfaces';

import { handler as deleteBotHandler } from './hemeraRoutes/deleteBot';
import { path as deleteBotPath } from './hemeraRoutes/deleteBot/interfaces';

hemera.registerRoutes([{
  path: registerPath,
  handler: registerHandler,
}, {
  path: authUserPath,
  handler: authUserHandler,
}, {
  path: authAccessBotPath,
  handler: authAccessBotHandler,
}, {
  path: addBotPath,
  handler: addBotHandler,
}, {
  path: deleteBotPath,
  handler: deleteBotHandler,
}]);

mongoConnect(connect);
