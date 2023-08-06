const MarketMongoose = require('../Mongoose/Market');
const PairMongoose = require('../Mongoose/Pair');
const SourceMongoose = require('../Mongoose/Source');

class Market {

	static async getAll(ctx){
		try{
		
			let markets = await MarketMongoose.find({target: ctx.userInfo.target}).populate({
					path: 'pairs',
					populate: {
						path: 'sourceId',
					}
				});
			if (!markets || markets.length === 0) return;
			
			let listMarkets = [];
			markets.forEach(market => {
				let sources = [];

				for(let pair of market.pairs) {
					sources.push(pair.sourceId.source);
				}

				listMarkets.push({name: market.name, id: market._id, sources: sources, premium: market.premium});
			
			});

			return listMarkets;
		} catch (e) {
			console.log(e);
		}
	}

	static async get(ctx, id){
		try{
		
			let market = await MarketMongoose.findById(id).populate({
					path: 'pairs',
					populate: {
						path: 'sourceId',
					}
				});
			return market
			
		} catch (e) {
			console.log(e);
			throw e;
		}
	}


}
module.exports = Market;