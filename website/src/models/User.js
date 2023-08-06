const UserMongoose = require('../mongoose/User');

class User {
	static async info(username){
		try{
			let currentUser = await UserMongoose.findOne({username}).collation( { locale: 'en', strength: 2 });
			return currentUser;
		} catch (e) {
			console.log(e);

		}
	}

	static async infoByUserId(user_id){
		try{
			let currentUser = await UserMongoose.findOne({user_id});
			return currentUser;
		} catch (e) {
			console.log(e);

		}
	}

	static async getById(_id){
		try{
			let currentUser = await UserMongoose.findById(_id);
			return currentUser;
		} catch (e) {
			console.log(e);
			
		}
	}

	static async premium(user){
		try{
			if (!user.premium) return false;
			let premium = Number(user.premium - Date.now());
			if (premium !== premium || premium <= 0) return false;
			let days = Math.ceil(premium/1000/3600/24);
			return days;
		} catch (e) {
			console.log(e);
		
		}
	}

	
}
module.exports = User;