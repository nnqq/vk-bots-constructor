import { Server } from '@hapi/hapi';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import HapiSwagger from 'hapi-swagger';
import { logger } from '../lib/logger';
import { usersRoutes } from './routes/users';

const init = async () => {
  const server = new Server({
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
    } as any,
  ]);

  server.realm.modifiers.route.prefix = '/api';

  server.route([...usersRoutes]);

  await server.start();
  logger.info(`API server running on ${server.info.uri}`);
};

process.on('unhandledRejection', (e: any) => {
  logger.error(e);
});

process.on('uncaughtException', (e: any) => {
  logger.error(e);
});

init();
