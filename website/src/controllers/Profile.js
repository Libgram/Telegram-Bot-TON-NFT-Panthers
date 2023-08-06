const User = require('../models/User')
const Address = require('../models/Address')
const NFT = require('../models/NFT')
const World = require('../models/World')

module.exports = {

	async get (ctx) {
		try{
			let username = ctx.params.username;
			const user = await User.info(username);
			if (!user) {
				let currentWorld = await World.getBySearch(username);
				if (!currentWorld) throw new Error('no user');
				  ctx.body = {status: true, data:{
				  	is_user: false,
		        	name: currentWorld.name,
		        	locale: 'en',
		        	premium: false,
		        	username: currentWorld.username,
		        	addresses: [
        				{
        					name: currentWorld.name,
        					address: currentWorld.address,
        				}
    				],
		        	image: currentWorld.image || null,
		        }};
		        return;
			}
			let name = '';
			if (user.first_name) {
				name += user.first_name;
			}

			if (user.last_name) {
				name += ' ' + user.last_name
			}
			const addresses = await Address.getByUserId(user._id);
			let NFTONE = null;
			if (addresses && addresses.length) {
				let NFTs = await NFT.getByAddressesId(addresses.map(item => item._id));
				if (NFTs && NFTs.length > 0) {
					NFTONE = NFTs[0].hash;
				}
			}
	        ctx.body = {status: true, data:{
	        	is_user: true,
	        	name: name,
	        	locale: user.locale,
	        	premium: user.premium,
	        	username: user.username,
	        	tm: user.tm,
	        	addresses: addresses.length > 0 ? addresses.map(address => {return {address:address.address, name: address.name}}) : [] ,
	        	image: NFTONE
	        }};
	        return;
		}
		catch (e){
			console.log(e);
			ctx.body = {status: false};
			return;
		}
	},

	async getByUserId (ctx) {
		try{
			let username = ctx.params.username;
			const user = await User.infoByUserId(username);
			if (!user) throw 'no user';
			let name = '';
			if (user.first_name) {
				name += user.first_name;
			}

			if (user.last_name) {
				name += ' ' + user.last_name
			}
			const addresses = await Address.getByUserId(user._id);
			let NFTONE = null;
			if (addresses && addresses.length) {
				let NFTs = await NFT.getByAddressesId(addresses.map(item => item._id));
				if (NFTs && NFTs.length > 0) {
					NFTONE = NFTs[0].hash;
				}
			}
	        ctx.body = {status: true, data:{
	        	is_user: true,
	        	name: name,
	        	locale: user.locale,
	        	premium: user.premium,
	        	username: user.username,
	        	tm: user.tm,
	        	addresses: addresses.length > 0 ? addresses.map(address => {return {address:address.address, name: address.name}}) : [] ,
	        	image: NFTONE
	        }};
	        return;
		}
		catch (e){
			console.log(e);
			ctx.body = {status: false};
			return;
		}
	},
  
};
