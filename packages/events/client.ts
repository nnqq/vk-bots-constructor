import { hemera } from '../lib/hemera';
import {
  IParams as createEventParams,
  IResponse as createEventResponse,
  path as createEventPath,
} from './hemeraRoutes/createEvent';

export const events = {
  createEvent(params: createEventParams): Promise<createEventResponse> {
    return hemera.send(createEventPath, params);
  },
};
