const UserMongoose = require('../Mongoose/User');
const MarketMongoose = require('../Mongoose/Market');
const PairMongoose = require('../Mongoose/Pair');
const SourceMongoose = require('../Mongoose/Source');

class User {
	static async is(user_id){
		try{
			let currentUser = await UserMongoose.findOne({user_id});
			return currentUser;
		} catch (e) {
			console.log(e);
			throw e;
		}
	}

	static async registration(userInfo){
		try{
			let currentUser = await UserMongoose.create({
				...userInfo,
				tutorial: 0,
				});
			return currentUser;
		} catch (e) {
			console.log(e);
			throw e;
		}
	}

	static async isById(_id){
		try{
			let currentUser = await UserMongoose.findById(_id);
			return currentUser;
		} catch (e) {
			console.log(e);
		}
	}

	static async premium(ctx){
		try{
			if (!ctx.userInfo.premium) return false;
			let premium = Number(ctx.userInfo.premium - Date.now());
			if (premium !== premium || premium <= 0) return false;
			let days = Math.ceil(premium/1000/3600/24);
			return days;
		} catch (e) {
			console.log(e);
		}
	}

	static async addPremium(ctx, month){
		try{
			let isPremium = await User.premium(ctx);
			let newPremium = null;
			if (!isPremium || isPremium <= 0) {
				newPremium = new Date(Date.now());
			} else{
				newPremium = new Date(ctx.userInfo.premium);
			}
			newPremium.setDate(newPremium.getDate() + month * 30);
			ctx.userInfo.premium = newPremium;
			await ctx.userInfo.save();
	
		} catch (e) {
			console.log(e);
		}
	}

	static async getMarkets(ctx){
		try{
		
			let currentUser = await UserMongoose.findOne({_id: ctx.userInfo._id}).populate(
				{
				path: 'markets', 
				populate: {
					path: 'pairs',
					populate: {
						path: 'sourceId',
					}
				}
			});
			if (!currentUser || !currentUser.markets || currentUser.markets.length === 0) return;
			let markets = currentUser.markets;
			let listMarkets = [];
			markets.forEach(market => {
				if (market.target !== ctx.userInfo.target) return;
				let price = 1;
				let sources = [];

				if (!market || !market.pairs || market.pairs.length === 0) return;

				let firstCurrency = market.pairs[0].currency;

				for(let pair of market.pairs) {
					sources.push(pair.sourceId.source);
					
				}

				for(let pair of market.pairs) {
					if ((Date.now() - pair.price_update) / 1000 > process.env.OLD_PAIR) {
						price = null;
						break;
					}
					
					price *= pair.price;
				}
				listMarkets.push({premium: market.premium, price: price, currency: firstCurrency, name: market.name, id: market._id, sources: sources});
			
			});

	
			return listMarkets;
		} catch (e) {
			console.log(e);
	
		}
	}

	

}
module.exports = User;