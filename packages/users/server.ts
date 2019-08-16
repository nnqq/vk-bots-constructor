import mongoose from 'mongoose';
import { hemera } from '../lib/hemera';
import { mongoConnect } from '../lib/mongo';
import { path as registerPath, handler as registerHandler } from './hemeraRoutes/register';
import { path as authUserPath, handler as authUserHandler } from './hemeraRoutes/auth/authUser';
import { path as authAccessBotPath, handler as authAccessBotHandler } from './hemeraRoutes/auth/authAccessBot';
import { path as addBotPath, handler as addBotHandler } from './hemeraRoutes/addBot';

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
}]);

mongoConnect(mongoose);
