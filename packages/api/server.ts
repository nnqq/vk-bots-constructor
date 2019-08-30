import { Server } from '@hapi/hapi';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import HapiSwagger from 'hapi-swagger';
import hapiAuthBearerToken from 'hapi-auth-bearer-token';
import { logger } from '@nnqq/vk-bots-constructor-lib';
import { authUser } from './auth/authUser';
import { authAccessBot } from './auth/authAccessBot';
import { usersRoutes } from './routes/users';
import { botsRoutes } from './routes/bots';
import { eventsRoutes } from './routes/events';
import { keywordsRoutes } from './routes/keywords';

const init = async () => {
  const server = new Server({
    port: process.env.PORT || 4000,
    host: process.env.HOST || '0.0.0.0',
  });

  const swaggerOptions = {
    info: {
      title: 'VK bots constructor API Documentation',
    },
    documentationPath: '/api/docs',
    jsonPath: '/api/swagger.json',
    swaggerUIPath: '/api/swaggerui/',
    grouping: 'tags',
    securityDefinitions: {
      Bearer: {
        type: 'apiKey',
        description: 'Your token. Paste "Bearer XXXX-XXXX-XXXX-XXXX"',
        name: 'Authorization',
        in: 'header',
      },
    },
    security: [{ Bearer: [] }],
    cors: true,
  };

  await server.register([
    hapiAuthBearerToken,
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    } as any,
  ]);

  authUser(server);
  authAccessBot(server);

  server.realm.modifiers.route.prefix = '/api';

  server.route([...usersRoutes, ...botsRoutes, ...eventsRoutes, ...keywordsRoutes]);

  await server.start();
  logger.info(`API server running on ${server.info.uri}`);
};

init();
