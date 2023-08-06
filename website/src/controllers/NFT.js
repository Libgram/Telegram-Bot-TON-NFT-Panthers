const NFTMongoose = require('../models/NFT')
const Address = require('../models/Address')
const NFT = require('../models/NFT')

module.exports = {

	async getByAddress (ctx) {
		try{
			let adr = ctx.params.address;
			const currentAddress = await Address.get(adr);
			if (!currentAddress) throw new Error('no current address');
			const NFTs = await NFT.getByAddressId(currentAddress._id);
			if (!NFTs) throw new Error('no nfts');
			
	        ctx.body = {status: true, data: NFTs.map(nft => {return {
	        	hash: nft.hash,
	        	civil: nft.civil,
	        	power: nft.power
	        }})};
		}
		catch (e){
			console.log(e);
			ctx.body = {status: false};
			return;
		}
	},
  
};
