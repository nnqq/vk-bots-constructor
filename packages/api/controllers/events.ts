import { Request } from '@hapi/hapi';
import { events } from '../../events/client';
import { IParams as ICreateEventParams } from '../../events/hemeraRoutes/createEvent';
import { IParams as IGetEventsParams } from '../../events/hemeraRoutes/getEvents';
import { IParams as IEditEventParams } from '../../events/hemeraRoutes/editEvent';
import { IParams as IDeleteEventParams } from '../../events/hemeraRoutes/deleteEvent';

interface ICreateEvent {
  payload: ICreateEventParams;
}
type ICreateEventRequest = Request & ICreateEvent;

interface IGetEvents {
  payload: IGetEventsParams;
}
type IGetEventsRequest = Request & IGetEvents;

interface IEditEvent {
  payload: IEditEventParams;
}
type IEditEventRequest = Request & IEditEvent;

interface IDeleteEvent {
  payload: IDeleteEventParams;
}
type IDeleteEventRequest = Request & IDeleteEvent;

export const controllers = {
  createEvent(req: ICreateEventRequest) {
    return events.createEvent(req.payload);
  },

  getEvents(req: IGetEventsRequest) {
    return events.getEvents(req.payload);
  },

  editEvent(req: IEditEventRequest) {
    return events.editEvent(req.payload);
  },

  deleteEvent(req: IDeleteEventRequest) {
    return events.deleteEvent(req.payload);
  },
};
