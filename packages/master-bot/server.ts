// @ts-ignore
import VkBot from 'node-vk-bot-api';
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import {
  GROUP_ID, TOKEN, SECRET, CONFIRMATION, URL_UUID,
} from './constants';

const app = new Koa();
const router = new Router();

const bot = new VkBot({
  group_id: GROUP_ID,
  token: TOKEN,
  confirmation: CONFIRMATION,
  secret: SECRET,
});

bot.event('message_new', (ctx: any) => {
  ctx.reply('asdasdas');
});

router.post(`/${URL_UUID}`, (ctx, next) => {
  ctx.status = 200;
  bot.webhookCallback(ctx, next);
});

app.use(bodyParser());
app.use(router.routes());

app.listen(6000);
