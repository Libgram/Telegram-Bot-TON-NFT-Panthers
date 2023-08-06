require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {useNewUrlParser: true, useUnifiedTopology: true});
const RedisIO = require("ioredis");
global.Redis = new RedisIO({
	port: process.env.REDIS_PORT,
	host: process.env.REDIS_HOST,
});

const CMCController = require('./app/Controllers/CMCController');




(async () => {

	setTimeout(async function CMC() {
	    await CMCController.main({category: 'spot'});
	    console.log('[CMC] spot updated')
	    setTimeout(CMC, 5000);
	 
	},1);
/*
	setTimeout(async function CMC() {
	    await CMCController.getCurrencyInfo({currency: 'toncoin', id: 11419});
	    console.log('[CMC] quotes updated')
	    setTimeout(CMC, 1000 * 60 * 5);
	 
	},1);*/


})();

