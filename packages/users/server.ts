import { hemera } from '../lib/hemera';
import { path as registerPath, handler as registerHandler } from './hemeraRoutes/register';
import { path as authUserPath, handler as authUserHandler } from './hemeraRoutes/auth/authUser';

hemera.add(registerPath, registerHandler);
hemera.add(authUserPath, authUserHandler);
