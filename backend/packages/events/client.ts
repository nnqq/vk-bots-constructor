import { hemera } from '../lib/hemera';
import {
  IParams as createEventParams,
  IResponse as createEventResponse,
  path as createEventPath,
} from './hemeraRoutes/createEvent';

import {
  IParams as getEventsParams,
  IResponse as getEventsResponse,
  path as getEventsPath,
} from './hemeraRoutes/getEvents';

import {
  IParams as editEventParams,
  IResponse as editEventResponse,
  path as editEventPath,
} from './hemeraRoutes/editEvent';

import {
  IParams as deleteEventParams,
  IResponse as deleteEventResponse,
  path as deleteEventPath,
} from './hemeraRoutes/deleteEvent';

import {
  IParams as deleteAllEventsParams,
  IResponse as deleteAllEventsResponse,
  path as deleteAllEventsPath,
} from './hemeraRoutes/deleteAllEvents';

export const events = {
  createEvent(params: createEventParams): Promise<createEventResponse> {
    return hemera.send(createEventPath, params);
  },

  getEvents(params: getEventsParams): Promise<getEventsResponse> {
    return hemera.send(getEventsPath, params);
  },

  editEvent(params: editEventParams): Promise<editEventResponse> {
    return hemera.send(editEventPath, params);
  },

  deleteEvent(params: deleteEventParams): Promise<deleteEventResponse> {
    return hemera.send(deleteEventPath, params);
  },

  deleteAllEvents(params: deleteAllEventsParams): Promise<deleteAllEventsResponse> {
    return hemera.send(deleteAllEventsPath, params);
  },
};
