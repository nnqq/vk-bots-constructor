import { ServerRoute } from '@hapi/hapi';
import Joi from '@hapi/joi';
import { controllers } from '../controllers/events';

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
          trigger: Joi.string().valid(['message_allow', 'message_deny', 'group_join', 'group_leave']).required(),
          message: Joi.string().required(),
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
        payload: {
          botId: Joi.string().required(),
          eventId: Joi.string().required(),
          trigger: Joi.string().valid(['message_allow', 'message_deny', 'group_join', 'group_leave']),
          message: Joi.string(),
          isEnabled: Joi.boolean(),
        },
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
