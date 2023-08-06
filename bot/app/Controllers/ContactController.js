const templates = require('../templates');
class ContactController {


	static async addPhoneInfo({ctx}) {	
		try{		

			if (ctx.userInfo.tutorial === -1) {
				let phone = ctx.message.contact.phone_number				
				if (phone) {
					ctx.userInfo.phone = phone;
					await ctx.userInfo.save();

					let addedPhoneTemplate = templates.addedPhone(ctx);
					await ctx.reply(addedPhoneTemplate.text, addedPhoneTemplate.extra)

					let menuTemplate = templates.menu(ctx);
					await ctx.reply(menuTemplate.text, menuTemplate.extra);
					return;
				}
				
			} 
		
			

		} catch(e) {
			console.log(e);
		}
	}




}

module.exports = ContactController;