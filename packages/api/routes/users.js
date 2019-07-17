import { controllers } from '../controllers/users.js';

export const usersRoutes = [
  {
    method: 'GET',
    path: '/users/register',
    options: {
      tags: ['api', 'users'],
      handler: controllers.registerUser,
    },
  },
];
