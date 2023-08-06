require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {useNewUrlParser: true, useUnifiedTopology: true});
const RedisIO = require("ioredis");
global.Redis = new RedisIO({
	port: process.env.REDIS_PORT,
	host: process.env.REDIS_HOST,
});

const CurrenciesController = require('./app/Controllers/CurrenciesController');

(async () => {

	setTimeout(async function currencies() {
	    await CurrenciesController.main();
	    console.log('[CryptoCompare]: updated')
	    setTimeout(currencies, 1000 * 60 * 60);
	},1);


})();

