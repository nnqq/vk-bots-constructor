import Nats from 'nats';
import Hemera from 'nats-hemera';

export interface IHemeraPath {
  topic: string;
  cmd: string;
}

class HemeraBase extends Hemera<any, any> {
  constructor(transport: Object, config: Hemera.Config) {
    super(transport, config);
  }

  async send(path: IHemeraPath, params: object): Promise<any> {
    const props = {
      ...path,
      params,
    };
    const response = await super.act(props);

    return response.data;
  }
}

const nats = Nats.connect('nats://0.0.0.0:4222');

export const hemera = new HemeraBase(nats, {
  logLevel: 'info',
  prettyLog: process.env.NODE_ENV === 'development',
});
