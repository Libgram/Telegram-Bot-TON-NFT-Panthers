const UserMongoose = require('../mongoose/User')
const NFTMongoose = require('../mongoose/NFT')
const Big = require('big.js');
const fs = require('fs');
Big.strict = true
module.exports = {
	async updateAllMOON() {
		try{
			let users = await UserMongoose.find().sort({user_id:1});
			let sum = '0';

			for(let user of users){
				sum = new Big(sum).plus(user.tm || '0');
			}
			await global.Redis.set(`MOON`, sum);
			console.log(`🌙 POOL: ${sum} 🌕`);
			
		
		} catch(e){
			console.log(e)
		}
	},

	async checkNFTs() {
		try{
			let nfts = await NFTMongoose.find({addressId: {$ne: null}}).sort({hash:1});
		
			for (let nft of nfts){
				let path = null;
				if (nft.civil === 1) {
					path = `./src/data/nfts/${nft.key}.png`;
				}
				if (nft.civil === 2) {
					path = `./src/data/nfts/japan/${nft.key - 2500}.png`;
				}
				if (nft.civil === 3) {
					path = `./src/data/nfts/england/${nft.key - 5000}.png`;
				}
				if (!path) continue;

				let publicPath = `../files/public/nfts/${nft.hash}.png`;
				if (!fs.existsSync(publicPath)) {
					fs.copyFileSync(path, publicPath);
				}
				

			}

		} catch(e){
			console.log(e)
		}
	}
};
