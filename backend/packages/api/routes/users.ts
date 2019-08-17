import { ServerRoute } from '@hapi/hapi';
import Joi from '@hapi/joi';
import { controllers } from '../controllers/users';

export const usersRoutes: ServerRoute[] = [
  {
    method: 'GET',
    path: '/users/register',
    options: {
      tags: ['api', 'users'],
      description: 'Callback for VK OAuth',
      handler: controllers.registerUser,
      validate: {
        query: {
          code: Joi.string().required(),
        },
      },
    },
  },
];
