require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {useNewUrlParser: true, useUnifiedTopology: true});

const CryptoBotController = require('./app/Controllers/CryptoBotController');
global.accounts = {
	'UAH_TON' : null,
	'RUB_TON' : null
};





(async () => {

	setTimeout(async function UAH_TON() {
	    await CryptoBotController.main('UAH_TON');
	    console.log('[CryptoBot]: UAH_TON')
	    setTimeout(UAH_TON, 5000);
	 
	},1);

	setTimeout(async function RUB_TON() {
	    await CryptoBotController.main('RUB_TON');
	    console.log('[CryptoBot]: RUB_TON')
	    setTimeout(RUB_TON, 5000);
	 
	},1000);


})();

