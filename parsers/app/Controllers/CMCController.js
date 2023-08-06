const Rates = require("../Libs/CMC/Rates");
const Quotes = require("../Libs/CMC/Quotes");
const Pair = require("../Mongoose/pair");
const Source = require("../Mongoose/source");

class CMCController {


	static async main({category}) {	
	

		try{
			
			let pairs = await Rates.getMarkets({category: 'spot'});
			if (!pairs) return;

			for(let pair of pairs){
			
				try{
				
					let currentSource = await Source.findOne({source: pair.source});
					if (!currentSource) continue;

					let currentPair = await Pair.findOne({sourceId: currentSource._id, pair: pair.pair});
					if (!currentPair) {
						await Pair.create({
							...pair, 
							sourceId: currentSource._id,
							price_update: Date.now()
							});
					}else{
						currentPair['price'] = pair.price;
						currentPair['price_update'] = Date.now();
						await currentPair.save();
					}
				} catch(e) {
					console.log(e);
				}

			}
		
	
			

		} catch(e) {

			console.log(e);
		}
	}

	static async getCurrencyInfo({currency, id}) {	
	

		try{
			
			let quote = await Quotes.get({currency, id});
			if (!quote) return;
			global.Redis.set(`${currency}-cmc`, JSON.stringify(quote), 'EX', 60*10);
	
		
	
			

		} catch(e) {

			console.log(e);
		}
	}



}

module.exports = CMCController;