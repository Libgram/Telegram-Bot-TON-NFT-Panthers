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
  locales: ['ru', 'en', 'uk'],
  directory: './app/locales',
  defaultLocale: 'en',
  objectNotation: true,
  extension: '.js',
});
 
const CronController = require('./app/Controllers/CronController');

global.Moon = new Telegraf(process.env.BOT_TOKEN);
global.Moon.catch(e => console.log(e));
// Enable graceful stop
process.once('SIGINT', () => global.Moon.stop('SIGINT'));
process.once('SIGTERM', () => global.Moon.stop('SIGTERM'));

(async () => {
	// LifeCycle add addresses
	setTimeout(async function addAddress() {
		await CronController.addAddress();
		setTimeout(addAddress, 10000);
	}, 1);


})();

