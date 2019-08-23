import { events } from '../../events';
import { IParamsBase as ICreateEventParams } from '../../events/hemeraRoutes/createEvent/interfaces';
import { IParams as IGetEventsParams } from '../../events/hemeraRoutes/getEvents/interfaces';
import { IParamsBase as IEditEventParams } from '../../events/hemeraRoutes/editEvent/interfaces';
import { IParamsBase as IDeleteEventParams } from '../../events/hemeraRoutes/deleteEvent/interfaces';
import { IQueryBotId } from '../interfaces';

type ICreateEvent = {
  payload: ICreateEventParams;
} & IQueryBotId;

interface IGetEvents {
  query: IGetEventsParams;
}

type IEditEvent = {
  payload: IEditEventParams;
} & IQueryBotId;

type IDeleteEvent = {
  payload: IDeleteEventParams;
} & IQueryBotId;

export const controllers = {
  createEvent(req: ICreateEvent) {
    const params = {
      ...req.payload,
      ...req.query,
    };

    return events.createEvent(params);
  },

  getEvents(req: IGetEvents) {
    return events.getEvents(req.query);
  },

  editEvent(req: IEditEvent) {
    const params = {
      ...req.payload,
      ...req.query,
    };

    return events.editEvent(params);
  },

  deleteEvent(req: IDeleteEvent) {
    const params = {
      ...req.payload,
      ...req.query,
    };

    return events.deleteEvent(params);
  },
};
