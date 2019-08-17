import mongoose from 'mongoose';
import { hemera } from '../lib/hemera';
import { mongoConnect } from '../lib/mongo';
import { path as createEventPath, handler as createEventHandler } from './hemeraRoutes/createEvent';
import { path as getEventsPath, handler as getEventsHandler } from './hemeraRoutes/getEvents';
import { path as editEventPath, handler as editEventHandler } from './hemeraRoutes/editEvent';
import { path as deleteEventPath, handler as deleteEventHandler } from './hemeraRoutes/deleteEvent';
import { path as deleteAllEventsPath, handler as deleteAllEventsHandler } from './hemeraRoutes/deleteAllEvents';

hemera.registerRoutes([{
  path: createEventPath,
  handler: createEventHandler,
}, {
  path: getEventsPath,
  handler: getEventsHandler,
}, {
  path: editEventPath,
  handler: editEventHandler,
}, {
  path: deleteEventPath,
  handler: deleteEventHandler,
}, {
  path: deleteAllEventsPath,
  handler: deleteAllEventsHandler,
}]);

mongoConnect(mongoose);
