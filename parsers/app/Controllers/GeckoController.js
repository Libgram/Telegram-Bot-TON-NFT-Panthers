const Gecko = require("../Libs/Gecko/Gecko");
const Chart = require("../Models/Canvas/Chart");

class GeckoController {


	static async rates() {	
	

		try{
			
			let getCurrencies = await Gecko.rates();
			if (!getCurrencies) return;
		
			let currencies = {
				'USD': 1,

				'TONCOIN': 1 / getCurrencies['the-open-network']['usd'],
				'BTC': getCurrencies['the-open-network']['btc'] / getCurrencies['the-open-network']['usd'],
				'ETH': getCurrencies['the-open-network']['eth'] / getCurrencies['the-open-network']['usd'],
				'USDT': getCurrencies['tether']['usd'],
				'EUR': getCurrencies['the-open-network']['eur'] / getCurrencies['the-open-network']['usd'],
				'UAH': getCurrencies['the-open-network']['uah'] / getCurrencies['the-open-network']['usd'],
				'RUB': getCurrencies['the-open-network']['rub'] / getCurrencies['the-open-network']['usd'],
				
			}

			for( let currency in currencies) {
				global.Redis.set(`currency-${currency}`, currencies[currency], 'EX', 60*15);
	
			}
		
	
			

		} catch(e) {

			console.log(e);
		}
	}

	static async info() {	
	

		try{
			
			let getInfo = await Gecko.info();
			if (!getInfo) return;
		
			global.Redis.set(`info`, JSON.stringify(getInfo), 'EX', 60*60);
	
			

		} catch(e) {

			console.log(e);
		}
	}

	static async chart() {	
	

		try{
			
			let getChartInfo = await Gecko.chart();
			if (!Array.isArray(getChartInfo) || getChartInfo.length === 0) return;
			let create = await Chart.generate(getChartInfo);
			if (!create) return;
			
			global.Redis.set(`chart`, create, 'EX', 60*60);
	
			

		} catch(e) {

			console.log(e);
		}
	}


}

module.exports = GeckoController;