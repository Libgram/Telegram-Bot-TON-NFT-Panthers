const UserMongoose = require('../Mongoose/User');
const NotifyMongoose = require('../Mongoose/Notify');

class Notify {
	static async create(userId, amount, cond, to){
		try{
			let createNotify = await NotifyMongoose.create({userId, amount, cond, to, status: 1});
			if (!createNotify) throw new Error('error create notify');
			return createNotify;
	
		} catch (e) {
			console.log(e);
		
		}
	}

	static async get(id){
		try{
			let notify = await NotifyMongoose.findById(id);
			return notify;
	
		} catch (e) {
			console.log(e);
			
		}
	}

	static async getByUser(ctx){
		try{
			let notifies = await NotifyMongoose.find({userId: ctx.userInfo._id, status: 1}).sort({createdAt: 1});
			return notifies;
	
		} catch (e) {
			console.log(e);
			
		}
	}

	static async getAll(){
		try{
			let notifies = await NotifyMongoose.find({status: 1}).sort({createdAt: 1}).populate({
					path: 'userId',
				});
			return notifies;
	
		} catch (e) {
			console.log(e);
			throw e;
		}
	}

}
module.exports = Notify;