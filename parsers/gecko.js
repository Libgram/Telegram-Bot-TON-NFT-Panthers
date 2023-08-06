require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {useNewUrlParser: true, useUnifiedTopology: true});
const RedisIO = require("ioredis");
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
global.chartCanvas = new ChartJSNodeCanvas({ width: 500, height: 200});
global.Redis = new RedisIO({
	port: process.env.REDIS_PORT,
	host: process.env.REDIS_HOST,
});

const GeckoController = require('./app/Controllers/GeckoController');

(async () => {

	setTimeout(async function rates() {
	    await GeckoController.rates();
	    console.log('[Gecko]: rates updated')
	    setTimeout(rates, 1000 * 20);
	},1);

	setTimeout(async function chart() {
	    await GeckoController.chart();
	    console.log('[Gecko]: chart updated')
	    setTimeout(chart, 1000 * 60 * 5);
	},2000);

	setTimeout(async function info() {
	    await GeckoController.info();
	    console.log('[Gecko]: info updated')
	    setTimeout(info, 1000 * 25);
	},3000);


})();

