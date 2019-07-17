import Hapi from '@hapi/hapi';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import HapiSwagger from 'hapi-swagger';
import { logger } from '../lib/logger/index.js';
import { usersRoutes } from './routes/users.js';

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: '0.0.0.0',
  });

  const swaggerOptions = {
    info: {
      title: 'VK bots constructor API Documentation',
    },
    documentationPath: '/api/docs',
    grouping: 'tags',
  };

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);

  server.realm.modifiers.route.prefix = '/api';

  server.route([...usersRoutes]);

  await server.start();
  logger.info(`API server running on ${server.info.uri}`);
};

process.on('unhandledRejection', (e) => {
  logger.error(e);
});

process.on('uncaughtException', (e) => {
  logger.error(e);
});

init();
