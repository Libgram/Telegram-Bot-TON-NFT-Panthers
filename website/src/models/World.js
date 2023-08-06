const WorldMongoose = require('../mongoose/World');

class World {
	static async create(address){
		try{
			if (address.length !== 48) throw new Error('no valide address')
			let currentWorld = await WorldMongoose.findOne({address: address});
			if (currentWorld) return currentWorld;
			let freeWorld = await WorldMongoose.findOne({address: null });
			freeWorld.address = address;
			freeWorld.save().catch(e =>{});
			return freeWorld;
	
		} catch (e) {
			console.log(e);
		
		}
	}

	static async getBySearch(username){
		try{
			let currentWorld = await WorldMongoose.findOne({search: username});
			return currentWorld;
	
		} catch (e) {
			console.log(e);
		
		}
	}

	static async creates(addresses){
		try{
			let addressesLinked = {};
			let noExistsAddresses = [];

			let worlds = await WorldMongoose.find({address: {$in: addresses}});
			if (worlds) {
				for (let world of worlds){
					addressesLinked[world.address] = {image: world.image, name: world.name, tags: world.tags};
				}
			}
	
			for(let adr of addresses){
				let ka = Object.keys(addressesLinked).find(w => {return w === adr});
				if (typeof ka !== 'string') noExistsAddresses.push(adr);
			}

			
			if (noExistsAddresses && noExistsAddresses.length > 0) {
				
				let creates = await WorldMongoose.find({address: null }).limit(noExistsAddresses.length);
				for (let i = 0; i < noExistsAddresses.length; i++) {
					creates[i].address = noExistsAddresses[i];
					addressesLinked[noExistsAddresses[i]] = {name: creates[i].name};
					creates[i].save().catch(e =>{console.log(e)});
				}
			}
			
	
			return addressesLinked;
	
		} catch (e) {
			console.log(e);
		
		}
	}


}
module.exports = World;