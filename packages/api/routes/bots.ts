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
      description: 'Callback for VK OAuth',
      handler: controllers.createBot,
      validate: {
        query: {
          code: Joi.string().required(),
          state: Joi.string().required(),
        },
      },
    },
  },
];
