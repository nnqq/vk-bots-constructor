import Hapi from '@hapi/hapi';
import { controllers } from '../controllers/bots';

export const botsRoutes: Hapi.ServerRoute[] = [
  {
    method: 'GET',
    path: '/bots/groups',
    options: {
      tags: ['api', 'bots'],
      handler: controllers.getGroups,
      auth: {
        strategy: 'user',
      },
    },
  },
];
