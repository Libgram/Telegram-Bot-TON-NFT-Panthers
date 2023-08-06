const User = require('../Models/User')
const Address = require('../Models/Address')
const templates = require('../templates');

class CommandController {
	static async start({ctx}) {	
		try{
			ctx.userInfo.panthers = true;
			await ctx.userInfo.save();
			// Tutorial
			if (ctx.userInfo.tutorial === 0) {
				let selectLanguageTemplate = templates.selectLanguage(ctx);
				await ctx.reply(selectLanguageTemplate.text, selectLanguageTemplate.extra);
				return;
			}

			if (ctx.userInfo.tutorial === 1) {
				let selectCurrencyTemplate = templates.selectCurrency(ctx);
				await ctx.reply(selectCurrencyTemplate.text, selectCurrencyTemplate.extra);
				return;
			}

			if (ctx.userInfo.tutorial === -1) {
				let menuTemplate = templates.menu(ctx);
				await ctx.reply(menuTemplate.text, menuTemplate.extra);
				return;
			}
			

		} catch(e) {
			console.log(e);
		}
	}
}

module.exports = CommandController;