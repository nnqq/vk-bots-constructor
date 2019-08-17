import { ServerRoute } from '@hapi/hapi';
import Joi from '@hapi/joi';
import { controllers } from '../controllers/bots';

export const botsRoutes: ServerRoute[] = [
  {
    method: 'GET',
    path: '/bots/groups',
    options: {
      tags: ['api', 'bots'],
      description: 'Get groups where current user have admin rules',
      handler: controllers.getGroups,
      auth: {
        strategy: 'user',
      },
    },
  },

  {
    method: 'GET',
    path: '/bots/create',
    options: {
      tags: ['api', 'bots'],
      description: 'Callback for VK OAuth to create Bot',
      handler: controllers.createBot,
      validate: {
        query: {
          code: Joi.string().required(),
          state: Joi.string().required(),
        },
      },
    },
  },

  {
    method: 'PATCH',
    path: '/bots',
    options: {
      tags: ['api', 'bots'],
      description: 'Edit Bot',
      handler: controllers.editBot,
      auth: {
        strategy: 'accessBot',
      },
      validate: {
        query: {
          botId: Joi.string().required(),
        },
        payload: {
          isEnabled: Joi.boolean().required(),
        },
      },
    },
  },
];
