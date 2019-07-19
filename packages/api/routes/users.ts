import Hapi from '@hapi/hapi';
import Joi from '@hapi/joi';
import { controllers } from '../controllers/users';

export const usersRoutes: Hapi.ServerRoute[] = [
  {
    method: 'GET',
    path: '/users/register',
    options: {
      tags: ['api', 'users'],
      handler: controllers.registerUser,
      validate: {
        query: {
          code: Joi.string().required(),
        },
      },
    },
  },
];
