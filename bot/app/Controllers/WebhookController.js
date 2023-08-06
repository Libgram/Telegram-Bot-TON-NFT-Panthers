const Order = require('../Models/Order')
const UserMongoose = require('../Mongoose/User');


class WebhookController {

	static async cryptobot(ctx) {	
		try{
			if (!ctx.request.body) throw new Error('no cryptopay body');
			let payload = ctx.request.body.payload;
			let currentOrder = await Order.isById(payload.payload);
			if (currentOrder.status === 0) {
				currentOrder.status = 1;
				let save = await currentOrder.save();
				if (save) {
					let isPremium = false;
					let currentUser = await UserMongoose.findById(save.userId);
					if (!currentUser.premium) isPremium = false;
					let premium = Number(currentUser.premium - Date.now());
					if (premium !== premium || premium <= 0) isPremium = false;
					isPremium = Math.ceil(premium/1000/3600/24);
					let newPremium = null;
					if (!isPremium || isPremium <= 0) {
						newPremium = new Date(Date.now());
					} else{
						newPremium = new Date(currentUser.premium);
					}
					newPremium.setDate(newPremium.getDate() + currentOrder.month * 30);
					currentUser.premium = newPremium;
					await currentUser.save();

				
				}
			}
	

		} catch(e) {
			console.log(e);
		}
	}



}

module.exports = WebhookController;