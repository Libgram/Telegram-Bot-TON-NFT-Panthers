const Currencies = require("../Libs/CryptoCompare/Currencies");

class CurrenciesController {


	static async main() {	
	

		try{
			
			let currencies = await Currencies.get();
			if (!currencies) return;

			global.Redis.set(`currencies`, JSON.stringify(currencies), 'EX', 60*60*5);
	
		
	
			

		} catch(e) {

			console.log(e);
		}
	}


}

module.exports = CurrenciesController;