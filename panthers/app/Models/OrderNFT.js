const UserMongoose = require('../Mongoose/User');
const NFTMongoose = require('../Mongoose/NFT');
const OrderNFTMongoose = require('../Mongoose/OrderNFT');


class OrderNFT {
	static async create(userId, NFTId){
		try{
			let create = await OrderNFTMongoose.create({userId, NFTId, payed: false});
			return create;
		} catch (e) {
			console.log(e);
		}
	}

	static async getById(_id){
		try{
			let get = await OrderNFTMongoose.findById(_id);
			return get;
		} catch (e) {
			console.log('err getbyid nft');
		}
	}


}
module.exports = OrderNFT;