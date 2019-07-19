import Boom from '@hapi/boom';
import { logger } from '../logger';

export const boomDecorator = (promise: Promise<object>): Promise<object> => promise.catch((e) => {
  logger.error(e);
  throw Boom.badRequest(e.message);
});
