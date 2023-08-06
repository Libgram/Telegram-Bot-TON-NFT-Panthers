const mathPrototype = require('./app/prototype/mathPrototype');
require('dotenv').config()
const path = require('path');
const mongoose = require('mongoose');
mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {useNewUrlParser: true, useUnifiedTopology: true});
const RedisIO = require("ioredis");
global.Redis = new RedisIO({
	port: process.env.REDIS_PORT,
	host: process.env.REDIS_HOST,
});

// Telegraf
const { Telegraf } = require('telegraf')
const i18n = require('i18n')
global.CRON_i18n = i18n;

i18n.configure({
  locales: ['ru', 'en', 'uk', 'es'],
  directory: './app/locales',
  defaultLocale: 'en',
  objectNotation: true,
  extension: '.js',
});
 
const Auth = require('./app/Middleware/Auth');
const Routes = require('./app/Routes/index');
const CronController = require('./app/Controllers/CronController');

global.Moon = new Telegraf(process.env.BOT_TOKEN);
global.Moon.catch(e => console.log(e));
// Enable graceful stop
process.once('SIGINT', () => global.Moon.stop('SIGINT'));
process.once('SIGTERM', () => global.Moon.stop('SIGTERM'));

(async () => {
	// LifeCycle Check Notifies
	setTimeout(async function checkNotifies() {
		await CronController.checkNotifies();
		setTimeout(checkNotifies, 10000);
	}, 1);

	global.Moon.use(async (ctx, next) => {
		let auth = await Auth(ctx);
		if (!auth) return;
		await next();
	})
	global.Moon.use(async (ctx, next) => {
		ctx.i18n = i18n;
		ctx.i18n.setLocale(ctx.userInfo.locale);
		await next();
	})

	await Routes();

	// // for dev
	global.Moon.launch();
	return;

	global.Moon.telegram.setWebhook(`https://tonmoonbot.com/webhooks/moon/${process.env.BOT_TOKEN}`)



	// Koa
	const Koa = require('koa');
	const RouterKoa = require('@koa/router');
	const Cors = require('@koa/cors');
	const appKoa = new Koa();
	const routerKoa = new RouterKoa();
	const koaBody = require('koa-body')
	const safeCompare = require('safe-compare')


	routerKoa.post(`/webhooks/moon/${process.env.BOT_TOKEN}`, async (ctx, next) => {
		await global.Moon.handleUpdate(ctx.request.body)
	    ctx.status = 200
	    await next();
	});

	const WebhookController = require('./app/Controllers/WebhookController')
	routerKoa.post(`/webhooks/cryptobot/${process.env.CRYPTO_TOKEN}`, async (ctx, next) => {
		await WebhookController.cryptobot(ctx);
	    ctx.status = 200
	    await next();
	});
	appKoa
		.use(Cors({
		  credentials: true,
		}))
		.use(koaBody())
		.use(routerKoa.routes())
		
	appKoa.listen(3001)



})();

