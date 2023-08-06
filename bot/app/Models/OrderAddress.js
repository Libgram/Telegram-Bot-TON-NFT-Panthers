const UserMongoose = require('../Mongoose/User');
const AddressMongoose = require('../Mongoose/Address');
const OrderAddressMongoose = require('../Mongoose/OrderAddress');


class OrderAddress {
	static async create(userId){
		try{
			let currentNotPayed = await OrderAddressMongoose.findOne({userId, payed: false});
			if (currentNotPayed) {
				return currentNotPayed;
			}
			else{
				let create = await OrderAddressMongoose.create({userId, payed: false});
				return create;
			}
		
		} catch (e) {
			console.log(e);
		}
	}

	static async getById(_id){
		try{
			let get = await OrderAddressMongoose.findById(_id);
			return get;
		} catch (e) {
			console.log('err getbyid address');
		}
	}


}
module.exports = OrderAddress;