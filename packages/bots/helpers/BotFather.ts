import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
// @ts-ignore
import VkBot from 'node-vk-bot-api';

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

  init() {
    const app = new Koa();
    const router = new Router();

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

  create({
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
