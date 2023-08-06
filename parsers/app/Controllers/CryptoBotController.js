const { Api, TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input");
const Account = require("../Models/CryptoBot/Account");

const Rates = require("../Libs/CMC/Rates");
const Pair = require("../Mongoose/pair");
const Source = require("../Mongoose/source");
class CryptoBotController {


	static async main(pairs) {	
		let accountsInfo = {
			'UAH_TON': {
				buy: 'TONCOIN',
				currency: 'UAH',
				apiId: 15380333,
				apiHash: "c900f5e1fde0238921f92f5e9c07dce7",
				stringSession: '1AgAOMTQ5LjE1NC4xNjcuNTABu1TQ6QJNJ5TFsdoUDiUnR0szPWOtluUAhljmgZ/EVowBDbx10pyPPzzbryz99R3Il4x78yx7UGEGg7wH8MmRCeKn8tYxuF0Gd1KE2PaFJeFeBSyxJPVdFvF7pwuU/hKxL3dNNQthB70li6OSTt6IiuIV2g803KNwZTeDlPJ9c225kE2t0rJhGmUU897+LoCMKh2/K6LJ3DyxlCRvaSXBXQBR49Ffaulj7CjdADMSJrbZ7xoHk5Q0ua0q0im3Hc85BYI1hEZZQ8XFH7ZlljVwjzsCO/arN2Ggp2VM3MlwNlDVgWAZNf0dHzJStqp3TXgY5P7V4BdLfNqGPJWqt8HTErw=',
			},
			'RUB_TON': {
				buy: 'TONCOIN',
				currency: 'RUB',
				apiId: 16967761,
				apiHash: "141492c7a5d0d02966a41b0bc0ea6ee9",
				stringSession: '1AgAOMTQ5LjE1NC4xNjcuNTABu4VHjYIjgHEuqFrx7FM8tWPLlQ7MDoF8CMdKpI2LEzDBO57DcZiK38kvXkvpBk4HfP1a+2gOoGe6JAkzKBL0l7yiC4lr/G0u25e7vUDT8WyXgkxSD0gfwH96pzevBCIpVcXbOl+WyUQDbjX5nkWUDZNu9ofU6bqX4IfUU4EpfMTvnSN1IsSqs0DkJfBRdrzIqvy/d8E8ANSfoN0QcsX5sNJ8jRCDyqLuPVActnsomF4r9Ejy9YNLtLWal1gcV0+x5MsP2Yrxkp5UNdl7EO7EiXQgF1ZaSyjYJgMnm9njKLI1/SbstfC2TCbPWMVlVZK79nJSnhr+ZZKIlXL2sreuIHE=',
			}
		};


		try{
			let account = null;
			if (!global.accounts[pairs]) {
				account = new Account(accountsInfo[pairs]);
				if (!account) throw new Error('error account');
				let start = await account.start();
				if (!start) throw new Error('error start');
				let sendMarket = await account.send('/market');
				if (!sendMarket) throw new Error('error sendMarket');
				let clickBuy = await account.click('Здесь вы можете купить', 'buy');
				if (!clickBuy) throw new Error('error clickBuy');
				global.accounts[pairs] = account;
			}
			else{
				account = global.accounts[pairs];
				let clickBackMarket = await account.click('Выберите способ оплаты для покупки криптовалюты', 'back');
				if (!clickBackMarket) throw new Error('error clickBackMarket');
			}
			
			let clickToncoin = await account.click('Выберите криптовалюту', 'choose-asset-TON');
			if (!clickToncoin) throw new Error('error clickToncoin');
			let getPrices = await account.getButtons('Выберите способ оплаты для покупки криптовалюты');
			if (!getPrices) throw new Error('error getPrices');
			for(let pair of getPrices){
				try{
					let split = pair.split(' · ');
					let name = split[0];
					let price = Number(split[1].replace('₽', '').replace('₴',''));
					let method = split[3].split('-')[2];
					let currentSource = await Source.findOne({source: 'CryptoBot'});
					if (!currentSource) continue;

					let currentPair = await Pair.findOne({currency: account.currency, sourceId: currentSource._id, pair: `TONCOIN/${method}`});
					if (!currentPair) {
						await Pair.create({
							category: 'market',
							pair: `TONCOIN/${method}`,
							from: method,
							to: 'TONCOIN',
							currency: account.currency,
							price: price,
							sourceId: currentSource._id,
							price_update: Date.now(),

							name: `${method} -> TONCOIN`,
						});
					}else{
						currentPair['price'] = price;
						currentPair['price_update'] = Date.now();
						await currentPair.save();
					}

					
					
				}catch(e) {
					console.log(e);
				}
			}
			



		} catch(e) {
			global.accounts[pairs] = null;
			console.log(e);
		}
	}



}

module.exports = CryptoBotController;