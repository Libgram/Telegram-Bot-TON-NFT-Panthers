const Rate = require("../Libs/Mercuryo/Rate");
const Pair = require("../Mongoose/pair");
const Source = require("../Mongoose/source");
class MercurioController {


	static async main(pairs) {	
		let accountsInfo = {
			'UAH_TON': {
				o: 'TONCOIN',
				c: 'UAH',
				i: 'UAH',
				amount: 100,
				t: false,
			},
			'RUB_TON': {
				o: 'TONCOIN',
				c: 'RUB',
				i: 'RUB',
				amount: 100,
				t: false,
			},
			'USD_TON': {
				o: 'TONCOIN',
				c: 'USD',
				i: 'USD',
				amount: 100,
				t: false,
			},
			'EUR_TON': {
				o: 'TONCOIN',
				c: 'EUR',
				i: 'EUR',
				amount: 100,
				t: false,
			},

			'TON_RUB': {
				o: 'RUB',
				c: 'RUB',
				i: 'TONCOIN',
				amount: 100,
				t: true,
			},
			'TON_USD': {
				o: 'USD',
				c: 'USD',
				i: 'TONCOIN',
				amount: 100,
				t: true,
			},
		};


		try{
			
			let price = await Rate.get(accountsInfo[pairs])
			if (!price) return;
			let currentSource = await Source.findOne({source: 'Mercuryo'});
			if (!currentSource) return;

			let currentPair = await Pair.findOne({sourceId: currentSource._id, pair: `${accountsInfo[pairs].o}/${accountsInfo[pairs].i}`});
			if (!currentPair) {
				await Pair.create({
					category: 'market',
					pair:  `${accountsInfo[pairs].o}/${accountsInfo[pairs].i}`,
					from: accountsInfo[pairs].i,
					to: accountsInfo[pairs].o,
					currency: accountsInfo[pairs].c,
					price: price,
					sourceId: currentSource._id,
					price_update: Date.now(),

					name: `${accountsInfo[pairs].i} -> ${accountsInfo[pairs].o}`,
				});
			}else{
				currentPair['price'] = price;
				currentPair['price_update'] = Date.now();
				await currentPair.save();
			}

		} catch(e) {

			console.log(e);
		}
	}



}

module.exports = MercurioController;