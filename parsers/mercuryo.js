require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {useNewUrlParser: true, useUnifiedTopology: true});
const RedisIO = require("ioredis");
global.Redis = new RedisIO({
	port: process.env.REDIS_PORT,
	host: process.env.REDIS_HOST,
});

const MercuryoController = require('./app/Controllers/MercuryoController');


(async () => {

	setTimeout(async function UAH_TON() {
	    await MercuryoController.main('UAH_TON');
	    console.log('[Mercuryo]: UAH_TON')
	    setTimeout(UAH_TON, 5000);
	 
	},1);

	setTimeout(async function RUB_TON() {
	    await MercuryoController.main('RUB_TON');
	    console.log('[Mercuryo]: RUB_TON')
	    setTimeout(RUB_TON, 5000);
	 
	},3000);

	setTimeout(async function USD_TON() {
	    await MercuryoController.main('USD_TON');
	    console.log('[Mercuryo]: USD_TON')
	    setTimeout(USD_TON, 5000);
	 
	},5000);


	setTimeout(async function TON_RUB() {
	    await MercuryoController.main('TON_RUB');
	    console.log('[Mercuryo]: TON_RUB')
	    setTimeout(TON_RUB, 5000);
	 
	},7000);


	setTimeout(async function TON_USD() {
	    await MercuryoController.main('TON_USD');
	    console.log('[Mercuryo]: TON_USD')
	    setTimeout(TON_USD, 5000);
	 
	},9000);




})();

