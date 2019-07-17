import Nats from 'nats';
import Hemera from 'nats-hemera';

class HemeraBase extends Hemera {
  async send(path, body) {
    const props = {
      ...path,
      body,
    };
    const response = await super.act(props);

    return response.data;
  }
}

export const hemera = new HemeraBase(Nats.connect('nats://0.0.0.0:4222'), {
  logLevel: 'info',
  prettyLog: process.env.NODE_ENV === 'development',
});
