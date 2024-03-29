// @ts-ignore
import VkBot from 'node-vk-bot-api';
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import { db } from '../database';
import { IResponse as IGetBotConfigResponse } from '../hemeraRoutes/getBotConfig/interfaces';
import { handler as getBotConfig } from '../hemeraRoutes/getBotConfig';
import { EnumKeywordRules } from '../../keywords/interfaces';

interface IBotData {
  botId: string;
  vkGroupId: number;
  vkGroupAccessToken: string;
  secret: string;
  confirmation: string;
}

interface IKillBot {
  botId: string;
}

class BotFather {
  bots: Map<string, any> = new Map();

  public async initBotFather() {
    const app = new Koa();
    const router = new Router();

    router.post('/:botId', (ctx, next) => {
      const { botId } = ctx.params;

      if (this.bots.has(botId)) {
        ctx.status = 200;
        this.bots.get(botId)!.webhookCallback(ctx, next);
      } else {
        ctx.status = 400;
        ctx.body = 'error';
      }
    });

    app.use(bodyParser());
    app.use(router.routes());

    app.listen(3000);

    const activeBotsList: IBotData[] = await db.bots.find({
      isEnabled: true,
    }, ['-isEnabled']).lean();

    const startBots = activeBotsList.map(activeBot => this.startBot(activeBot));

    return Promise.all(startBots);
  }

  public loadBot({
    botId, vkGroupId, vkGroupAccessToken, secret, confirmation,
  }: IBotData) {
    this.bots.set(botId, new VkBot({
      group_id: vkGroupId,
      token: vkGroupAccessToken,
      secret,
      confirmation,
    }));
  }

  public async startBot(botData: IBotData) {
    this.loadBot(botData);

    const { botId } = botData;

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

    this.bots.get(botId).event('message_new', (ctx: any) => {
      config.keywords.forEach(({
        triggers, rule, caseSensitive, message,
      }) => {
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

        const isContainKeywords = caseTriggers.some(trigger => inWords.includes(trigger));

        if (rule === EnumKeywordRules.contain && isContainKeywords) {
          return ctx.reply(message);
        }

        const isEqualKeywords = caseTriggers.some(trigger => inWords[0] === trigger);

        if (rule === EnumKeywordRules.equal && isEqualKeywords) {
          return ctx.reply(message);
        }

        return false;
      });
    });
  }

  public killBot({ botId }: IKillBot) {
    this.bots.delete(botId);
  }
}

export const botFather = new BotFather();
