import Boom from '@hapi/boom';
import { logger } from '../logger/index.js';

export const boomDecorator = promise => promise.catch((e) => {
  logger.error(e);
  throw Boom.badRequest(e.message);
});
