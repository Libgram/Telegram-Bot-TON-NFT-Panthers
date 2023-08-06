const User = require('../mongoose/User')
const Address = require('../mongoose/Address')
const World = require('../mongoose/World')
const TonWeb = require('../models/TonWeb');
const Currency = require('../models/Currency')
module.exports = {

	async capNFTs (ctx) {
		try{
			let NFTAddresses = await World.find({tags: 'NFT'});
			let data = [];
			
			for(let nft of NFTAddresses){
				console.log(nft);
				let balance = await TonWeb.getWallet(nft.address);
				balance = balance.balance / 1000000000
				data.push({balance, name: nft.name})
			}
			ctx.body = {status: true, data}
		}
		catch (e){
			console.log(e);
			ctx.body = {status: false};
			return;
		}
	},
  
};
