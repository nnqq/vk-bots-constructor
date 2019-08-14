import { IHemeraPath } from '../../lib/hemera';
import { handlerDecorator } from '../../lib/decorators/handlerDecorator';
import { botFather } from '../helpers/BotFather';
import { db } from '../database/client';

export const path: IHemeraPath = {
  topic: 'botsPubSub',
  cmd: 'refreshBot',
  pubsub$: true,
};

export interface IParams {
  botId: string;
}

export type IResponse = void;

export const handler = handlerDecorator(async (params: IParams): Promise<IResponse> => {
  const { botId } = params;

  const bot = await db.bots.findOne({
    botId,
    isEnabled: true,
  }, ['-_id', '-__v', '-isEnabled']);

  if (bot) {
    // Refresh and start bot only if it "isEnabled"
    await botFather.initBot(bot);
  }
});
