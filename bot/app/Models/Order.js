const UserMongoose = require('../Mongoose/User');
const OrderMongoose = require('../Mongoose/Order');

class Order {
	static async create(userId, type, month){
		try{
			let createOrder = await OrderMongoose.create({userId, type, month, status: 0});
			if (!createOrder) throw new Error('error create order');
			return createOrder;
	
		} catch (e) {
			console.log(e);
			
		}
	}

	static async is(userId, type, month){
		try{
			let currentOrder = await OrderMongoose.findOne({userId, type, month, status: 0});
			return currentOrder;
	
		} catch (e) {
			console.log(e);
			
		}
	}

	static async isById(id){
		try{
			let currentOrder = await OrderMongoose.findById(id);
			return currentOrder;
	
		} catch (e) {
			console.log(e);
		
		}
	}

}
module.exports = Order;