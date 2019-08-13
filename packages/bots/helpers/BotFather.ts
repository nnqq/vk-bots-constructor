import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
// @ts-ignore
import VkBot from 'node-vk-bot-api';
import { db } from '../database/client';
import { handler as getBotConfig, IResponse as IGetBotConfigResponse } from '../hemeraRoutes/getBotConfig';
import { EnumKeywordRules } from '../../keywords/interfaces';
import { logger } from '../../lib/logger';

interface IBot {
  botId: string;
  vkGroupId: number;
  vkGroupAccessToken: string;
  secret: string;
  confirmation: string;
}

class BotFather {
  private readonly bots: any;

  constructor() {
    this.bots = new Map();

    this.init()
      .then(() => {
        logger.info('BotFather started and loaded all active bots');
      })
      .catch((e) => {
        logger.fatal('Error at BotFather: ', e);
      });
  }

  private async init() {
    const app = new Koa();
    const router = new Router();

    router.post('/:botId', (ctx, next) => {
      const { botId } = ctx.params;

      if (this.bots.has(botId)) {
        ctx.status = 200;
        this.bots.get(botId).webhookCallback(ctx, next);
      } else {
        ctx.status = 400;
        ctx.body = 'error';
      }
    });

    app.use(bodyParser());
    app.use(router.routes());

    app.listen(3000);

    const activeBotsList = await db.bots.find({
      isEnabled: true,
    }, ['-isEnabled']);

    const startBots = activeBotsList.map(activeBot => this.refreshBot(activeBot));

    return Promise.all(startBots);
  }

  public create({
    botId, vkGroupId, vkGroupAccessToken, secret, confirmation,
  }: IBot) {
    this.bots.set(botId, new VkBot({
      group_id: vkGroupId,
      token: vkGroupAccessToken,
      secret,
      confirmation,
    }));
  }

  public async refreshBot({
    botId, vkGroupId, vkGroupAccessToken, secret, confirmation,
  }: IBot) {
    this.create({
      botId, vkGroupId, vkGroupAccessToken, secret, confirmation,
    });

    const config = await getBotConfig({
      params: {
        botId,
      },
    }) as IGetBotConfigResponse;

    config.events.forEach(({ trigger, message }) => {
      this.bots.get(botId).event(trigger, (ctx: any) => {
        ctx.reply(message);
      });
    });

    config.keywords.forEach(({
      triggers, rule, caseSensitive, message,
    }) => {
      this.bots.get(botId).event('message_new', (ctx: any) => {
        const inWords: string[] = [];

        const trimmedInMessage = ctx.message.text.trim();

        const caseTriggers: string[] = [];

        if (caseSensitive) {
          inWords.push(...trimmedInMessage.split(' '));

          caseTriggers.push(...triggers);
        } else {
          inWords.push(...trimmedInMessage.toLowerCase().split(' '));

          const loweredCaseTriggers = triggers.map(trigger => trigger.toLowerCase());

          caseTriggers.push(...loweredCaseTriggers);
        }

        if (rule === EnumKeywordRules.contain
          && caseTriggers.some(trigger => inWords.includes(trigger))) {
          return ctx.reply(message);
        }

        if (rule === EnumKeywordRules.equal
          && caseTriggers.some(trigger => inWords[0] === trigger)) {
          return ctx.reply(message);
        }

        return false;
      });
    });
  }
}

export const botFather = new BotFather();
