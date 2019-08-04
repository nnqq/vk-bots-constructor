import { hemera } from '../lib/hemera';
import { path as createEventPath, handler as createEventHandler } from './hemeraRoutes/createEvent';
import { path as getEventsPath, handler as getEventsHandler } from './hemeraRoutes/getEvents';
import { path as editEventPath, handler as editEventHandler } from './hemeraRoutes/editEvent';
import { path as deleteEventPath, handler as deleteEventHandler } from './hemeraRoutes/deleteEvent';

hemera.add(createEventPath, createEventHandler);
hemera.add(getEventsPath, getEventsHandler);
hemera.add(editEventPath, editEventHandler);
hemera.add(deleteEventPath, deleteEventHandler);
