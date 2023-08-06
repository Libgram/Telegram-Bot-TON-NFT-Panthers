const UserMongoose = require('../Mongoose/User');
const AddressMongoose = require('../Mongoose/Address');

class Address {
	static async create(userId, address){
		try{
			let createOrder = await AddressMongoose.create({userId, address, balance: 0, show: true});
			if (!createOrder) throw new Error('error create address');
			return createOrder;
	
		} catch (e) {
			console.log(e);
		
		}
	}

	static async getByUser(_id){
		try{
			let addresses = await AddressMongoose.find({userId: _id});
			return addresses;
	
		} catch (e) {
			console.log(e);
			
		}
	}

	static async get(_id){
		try{
			let address = await AddressMongoose.findById(_id);
			return address;
	
		} catch (e) {
			console.log(e);
			
		}
	}

}
module.exports = Address;