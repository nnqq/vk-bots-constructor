import { Request } from '@hapi/hapi';
import { events } from '../../events/client';
import { IParams as ICreateEventParams } from '../../events/hemeraRoutes/createEvent';

interface ICreateEvent {
  payload: ICreateEventParams;
}

type ICreateEventRequest = Request & ICreateEvent;

export const controllers = {
  createEvent(req: ICreateEventRequest) {
    return events.createEvent(req.payload);
  },
};
