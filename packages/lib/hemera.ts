import { connect } from 'nats';
import Hemera from 'nats-hemera';
import { badRequest } from '@hapi/boom';
import { logger } from './logger';

export interface IHemeraPath {
  topic: string;
  cmd: string;
  pubsub$?: true;
}

interface IRoute {
  path: IHemeraPath;
  handler: any;
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
      throw badRequest(e.message);
    }
  }

  registerRoutes(routes: IRoute[]) {
    try {
      routes.forEach(({ path, handler }) => {
        super.add(path, handler);
      });
    } catch (e) {
      logger.fatal(e);
      process.exit(1);
    }
  }
}

const nats = connect('nats://0.0.0.0:4222');

export const hemera = new HemeraBase(nats, {
  timeout: 5000,
  logLevel: 'info',
  prettyLog: process.env.NODE_ENV === 'development',
});
