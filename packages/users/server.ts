import { hemera } from '../lib/hemera';
import { path as registerPath, handler as registerHandler } from './hemeraRoutes/register';

hemera.add(registerPath, registerHandler);
