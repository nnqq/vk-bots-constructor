import { Request } from '@hapi/hapi';
import { events } from '../../events/client';
import { IParamsBase as ICreateEventParams } from '../../events/hemeraRoutes/createEvent';
import { IParams as IGetEventsParams } from '../../events/hemeraRoutes/getEvents';
import { IParamsBase as IEditEventParams } from '../../events/hemeraRoutes/editEvent';
import { IParamsBase as IDeleteEventParams } from '../../events/hemeraRoutes/deleteEvent';
import { IQueryBotId } from '../interfaces';

interface ICreateEvent {
  payload: ICreateEventParams;
}
type ICreateEventRequest = ICreateEvent & IQueryBotId & Request;

interface IGetEvents {
  query: IGetEventsParams;
}
type IGetEventsRequest = IGetEvents & Request;

interface IEditEvent {
  payload: IEditEventParams;
}
type IEditEventRequest = IEditEvent & IQueryBotId & Request;

interface IDeleteEvent {
  payload: IDeleteEventParams;
}
type IDeleteEventRequest = IDeleteEvent & IQueryBotId & Request;

export const controllers = {
  createEvent(req: ICreateEventRequest) {
    const params = {
      ...req.payload,
      ...req.query,
    };

    return events.createEvent(params);
  },

  getEvents(req: IGetEventsRequest) {
    return events.getEvents(req.query);
  },

  editEvent(req: IEditEventRequest) {
    const params = {
      ...req.payload,
      ...req.query,
    };

    return events.editEvent(params);
  },

  deleteEvent(req: IDeleteEventRequest) {
    const params = {
      ...req.payload,
      ...req.query,
    };

    return events.deleteEvent(params);
  },
};
