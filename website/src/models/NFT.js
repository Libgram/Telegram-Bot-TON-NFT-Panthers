
const NFTMongoose = require('../mongoose/NFT');

class Address {
	


	static async getByAddressId(address){
		try{
			let NFTs = await NFTMongoose.find({addressId: address});
			return NFTs;
	
		} catch (e) {
			console.log(e);
			
		}
	}

	static async getByAddressesId(addresses){
		try{
			let NFTs = await NFTMongoose.find({addressId: {$in: addresses}});
			console.log(NFTs);
			return NFTs;
	
		} catch (e) {
			console.log(e);
			
		}
	}

}
module.exports = Address;