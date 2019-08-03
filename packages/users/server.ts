import { hemera } from '../lib/hemera';
import { path as registerPath, handler as registerHandler } from './hemeraRoutes/register';
import { path as authUserPath, handler as authUserHandler } from './hemeraRoutes/auth/authUser';
import { path as authAccessBotPath, handler as authAccessBotHandler } from './hemeraRoutes/auth/authAccessBot';
import { path as addBotPath, handler as addBotHandler } from './hemeraRoutes/addBot';

hemera.add(registerPath, registerHandler);
hemera.add(authUserPath, authUserHandler);
hemera.add(authAccessBotPath, authAccessBotHandler);
hemera.add(addBotPath, addBotHandler);
