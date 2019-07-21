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
    method: 'POST',
    path: '/bots/create',
    options: {
      tags: ['api', 'bots'],
      description: 'Create new bot in group',
      handler: controllers.createBot,
      auth: {
        strategy: 'user',
      },
      validate: {
        query: {
          code: Joi.string().required(),
        },
      },
    },
  },
];
