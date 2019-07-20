import Nats from 'nats';
import Hemera from 'nats-hemera';
import Boom from '@hapi/boom';
import { logger } from './logger';

export interface IHemeraPath {
  topic: string;
  cmd: string;
}

class HemeraBase extends Hemera<any, any> {
  constructor(transport: Object, config: Hemera.Config) {
    super(transport, config);
  }

  async send(path: IHemeraPath, params: object): Promise<any> {
    try {
      const props = {
        ...path,
        params,
      };
      const response = await super.act(props);

      return response.data;
    } catch (e) {
      logger.error(e);
      throw Boom.badRequest(e.message);
    }
  }
}

const nats = Nats.connect('nats://0.0.0.0:4222');

export const hemera = new HemeraBase(nats, {
  timeout: 5000,
  logLevel: 'info',
  prettyLog: process.env.NODE_ENV === 'development',
});
