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
];
