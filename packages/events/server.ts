import { connect } from 'mongoose';
import { hemera } from '../lib/hemera';
import { mongoConnect } from '../lib/mongo';

import { handler as createEventHandler } from './hemeraRoutes/createEvent';
import { path as createEventPath } from './hemeraRoutes/createEvent/interfaces';

import { handler as getEventsHandler } from './hemeraRoutes/getEvents';
import { path as getEventsPath } from './hemeraRoutes/getEvents/interfaces';

import { handler as editEventHandler } from './hemeraRoutes/editEvent';
import { path as editEventPath } from './hemeraRoutes/editEvent/interfaces';

import { handler as deleteEventHandler } from './hemeraRoutes/deleteEvent';
import { path as deleteEventPath } from './hemeraRoutes/deleteEvent/interfaces';

import { handler as deleteAllEventsHandler } from './hemeraRoutes/deleteAllEvents';
import { path as deleteAllEventsPath } from './hemeraRoutes/deleteAllEvents/interfaces';

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

mongoConnect(connect);
