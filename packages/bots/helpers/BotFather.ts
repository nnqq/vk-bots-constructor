import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
// @ts-ignore
import VkBot from 'node-vk-bot-api';
import { db } from '../database/client';
import { handler as getBotConfig, IResponse as IGetBotConfigResponse } from '../hemeraRoutes/getBotConfig';
import { EnumKeywordRules } from '../../keywords/interfaces';

interface ICreate {
  botId: string;
  vkGroupId: number;
  vkGroupAccessToken: string;
  secret: string;
  confirmation: string;
}

class BotFather {
  private readonly bots: any;

  constructor() {
    this.bots = {};
    this.init();
  }

  private async init() {
    const app = new Koa();
    const router = new Router();

    const activeBotsList = await db.bots.find({
      isEnabled: true,
    }, ['-isEnabled']);

    const startBots = activeBotsList.map(async ({
      botId, vkGroupId, vkGroupAccessToken, secret, confirmation,
    }) => {
      this.create({
        botId, vkGroupId, vkGroupAccessToken, secret, confirmation,
      });

      const config = await getBotConfig({
        params: {
          botId,
        },
      }) as IGetBotConfigResponse;

      config.events.forEach(({ trigger, message }) => {
        this.bots[botId].event(trigger, (ctx: any) => {
          ctx.reply(message);
        });
      });

      config.keywords.forEach(({
        triggers, rule, caseSensitive, message,
      }) => {
        this.bots[botId].event('message_new', (ctx: any) => {
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
    });

    await Promise.all(startBots);

    router.post('/:botId', (ctx, next) => {
      const { botId } = ctx.params;

      if (this.bots[botId]) {
        ctx.status = 200;
        this.bots[botId].webhookCallback(ctx, next);
      } else {
        ctx.status = 400;
        ctx.body = 'error';
      }
    });

    app.use(bodyParser());
    app.use(router.routes());

    app.listen(3000);
  }

  public create({
    botId, vkGroupId, vkGroupAccessToken, secret, confirmation,
  }: ICreate) {
    this.bots[botId] = new VkBot({
      group_id: vkGroupId,
      token: vkGroupAccessToken,
      secret,
      confirmation,
    });
  }
}

export const botFather = new BotFather();
