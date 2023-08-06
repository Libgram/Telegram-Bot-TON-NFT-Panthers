require('dotenv').config();

const mathPrototype = require('./src/prototype/mathPrototype');
const CronController = require('./src/controllers/Cron');
const mongoose = require('mongoose');

const RedisIO = require("ioredis");
global.Redis = new RedisIO({
	port: process.env.REDIS_PORT,
	host: process.env.REDIS_HOST,
});
mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {useNewUrlParser: true, useUnifiedTopology: true});

(async () => {
	// LifeCycle updateAllMOON
	setTimeout(async function updateAllMOON() {
		await CronController.updateAllMOON();
		setTimeout(updateAllMOON, 10000);
	}, 1);

		setTimeout(async function checkNFTs() {
		await CronController.checkNFTs();
		setTimeout(checkNFTs, 10000);
	}, 1);


})();