import { ServerRoute } from '@hapi/hapi';
import Joi from '@hapi/joi';
import { controllers } from '../controllers/events';
import { TRIGGERS } from '../constants';

export const eventsRoutes: ServerRoute[] = [
  {
    method: 'POST',
    path: '/events',
    options: {
      tags: ['api', 'events'],
      description: 'Create new Event',
      handler: controllers.createEvent,
      auth: {
        strategy: 'accessBot',
      },
      validate: {
        payload: {
          botId: Joi.string().required(),
          trigger: Joi.string().valid(TRIGGERS).required(),
          message: Joi.string().required(),
          isEnabled: Joi.boolean(),
        },
      },
    },
  },

  {
    method: 'GET',
    path: '/events',
    options: {
      tags: ['api', 'events'],
      description: 'Get Events list of a Bot',
      handler: controllers.getEvents,
      auth: {
        strategy: 'accessBot',
      },
      validate: {
        query: {
          botId: Joi.string().required(),
        },
      },
    },
  },

  {
    method: 'PUT',
    path: '/events',
    options: {
      tags: ['api', 'events'],
      description: 'Edit Event of a Bot',
      handler: controllers.editEvent,
      auth: {
        strategy: 'accessBot',
      },
      validate: {
        payload: Joi.object({
          botId: Joi.string(),
          eventId: Joi.string(),
          trigger: Joi.string().valid(TRIGGERS),
          message: Joi.string(),
          isEnabled: Joi.boolean(),
        }).requiredKeys('botId', 'eventId')
          .or('trigger', 'message', 'isEnabled'),
      },
    },
  },

  {
    method: 'DELETE',
    path: '/events',
    options: {
      tags: ['api', 'events'],
      description: 'Delete Event of a Bot',
      handler: controllers.deleteEvent,
      auth: {
        strategy: 'accessBot',
      },
      validate: {
        payload: {
          botId: Joi.string().required(),
          eventId: Joi.string().required(),
        },
      },
    },
  },
];
