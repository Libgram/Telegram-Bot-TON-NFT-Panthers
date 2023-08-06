const UserMongoose = require('../Mongoose/User');
const NFTMongoose = require('../Mongoose/NFT');

class NFT{
	

	static async getAvailable(price, count, civil){
		try{
			let list = await NFTMongoose.aggregate([
			    { $match: { price, addressId: null, /*civil: civil*/} },
			    { $sample: { size: count } }
			])

			return list;
	
		} catch (e) {
			console.log(e);
		}
	}

	static async getByHash(hash){
		try{
			let get = await NFTMongoose.findOne({hash:hash})

			return get;
	
		} catch (e) {
			console.log(e);
		}
	}

	static async getById(_id){
		try{
			let get = await NFTMongoose.findById(_id)

			return get;
	
		} catch (e) {
			console.log('err getbyid nft');
		}
	}

}
module.exports = NFT;