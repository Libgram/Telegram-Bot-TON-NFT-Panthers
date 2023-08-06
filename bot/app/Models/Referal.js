const User = require('../Models/User')
class Referal {
	static async create(message){
		try{
			if (!message) return;
			let ref = message.match(/^\/start( (.+))?$/);
			if (!Array.isArray(ref) || ref.length !== 3) return;
			let id = Number(ref[2]);
			if (id && id === id) {
				let isUser = await User.is(Number(ref[2]));
				if (!isUser) return;
				return id;
			}
			

	
		} catch (e) {
			console.log(e);
		}
	}

}
module.exports = Referal;