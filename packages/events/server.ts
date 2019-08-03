import { hemera } from '../lib/hemera';
import { path as createEventPath, handler as createEventHandler } from './hemeraRoutes/createEvent';

hemera.add(createEventPath, createEventHandler);
