const UserMongoose = require('../mongoose/User');
const AddressMongoose = require('../mongoose/Address');

class Address {
	

	static async getByUserId(_id){
		try{
			let addresses = await AddressMongoose.find({userId: _id, show: true});
			return addresses;
	
		} catch (e) {
			console.log(e);
		}
	}

	static async get(adr){
		try{
			let address = await AddressMongoose.findOne({address: adr, show: true}).populate('userId');
			return address;
	
		} catch (e) {
			console.log(e);
		}
	}

	static async getAddresses(adrs){
		try{
			let address = await AddressMongoose.find({address: {$in: adrs}, show: true}).populate('userId');
			return address;
	
		} catch (e) {
			console.log(e);
		}
	}

}
module.exports = Address;