import { handlerDecorator } from '@nnqq/vk-bots-constructor-lib';
import { botFather } from '../../helpers/BotFather';
import { db } from '../../database';
import { IParams, IResponse } from './interfaces';

export const handler = handlerDecorator(async (params: IParams): Promise<IResponse> => {
  const { botId } = params;

  const bot = await db.bots.findOne({
    botId,
    isEnabled: true,
  }, ['-_id', '-__v', '-isEnabled']).lean();

  if (bot) {
    // Refresh and start bot only if it "isEnabled"
    await botFather.startBot(bot);
  }
});
