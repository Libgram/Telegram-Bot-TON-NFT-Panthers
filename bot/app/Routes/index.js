const CommandController = require('../Controllers/CommandController')
const CallbackController = require('../Controllers/CallbackController')
const ContactController = require('../Controllers/ContactController')
const InputController = require('../Controllers/InputController')
module.exports = (() => {

	global.Moon.on("text", async (ctx) => {
		try{
			switch(ctx.message.text) {

				case '/list':
				case '/monitoring':
				await CommandController.list({ctx});
				ctx.userInfo.path = null;
				await ctx.userInfo.save();
				return;

				case '/account':
				await CommandController.account({ctx});
				ctx.userInfo.path = null;
				await ctx.userInfo.save();
				return;

				case '/rate':
				await CommandController.rate({ctx});
				ctx.userInfo.path = null;
				await ctx.userInfo.save();
				return;

				case '/menu':
				await CommandController.menu({ctx});
				ctx.userInfo.path = null;
				await ctx.userInfo.save();
				return;

				case '/settings':
				await CommandController.settings({ctx});
				ctx.userInfo.path = null;
				await ctx.userInfo.save();
				return;
			}

			// start
			let ref = ctx.message.text.match(/^\/start( (.+))?$/);
			if (Array.isArray(ref)) {
				await CommandController.start({ctx});
				ctx.userInfo.path = null;
				await ctx.userInfo.save();
				return;
			}


			// если патч есть и он не сброшен верхними командами то проверяем валидность введеного
			if (ctx.userInfo.path) {
				let path = JSON.parse(ctx.userInfo.path);
				switch(path.name) {
					case 'setAddressName':
					await InputController.setAddressName({ctx, path});
					return;

					case 'addNotify':
					await InputController.addNotify({ctx, path});
					return;
				}
				
			
			}
			
		} catch(e) {
			console.log(e);
		}
	});

	global.Moon.on("callback_query", async (ctx) => {
		let s = null;
		try{
			s = ctx.callbackQuery.data;
			s = s.split('-');

			if (Number(s[3]) === 1) {
				ctx.deleteMessage().catch(e => console.log(e));
			}
			
			switch(s[0]) {

				// with params
				case 'setLocale':
				await CallbackController.setLocale({ctx, s});
				return;
				case 'setCurrency':
				await CallbackController.setCurrency({ctx, s});
				return;
				case 'setAddressShow':
				await CallbackController.setAddressShow({ctx, s});
				return;

				case 'setAddressName':
				await CallbackController.setAddressName({ctx, s});
				return;

				

				case 'removeMarket':
				await CallbackController.removeMarket({ctx, s});
				return;
				case 'addMarket':
				await CallbackController.addMarket({ctx, s});
				return;
				case 'selectMarket':
				await CallbackController.selectMarket({ctx, s});
				return;
				case 'buyPremium':
				await CallbackController.buyPremium({ctx, s});
				return;


				case 'notifies':
				await CallbackController.notifies({ctx, s});
				return;

				case 'onPhone':
				await CallbackController.onPhone({ctx, s});
				return;
				case 'addNotify':
				await CallbackController.addNotify({ctx, s});
				return;
				case 'removeNotify':
				await CallbackController.removeNotify({ctx, s});
				return;


				//	
				case 'selectLanguage':
				await CallbackController.selectLanguage({ctx, s});
				return;
				case 'selectCurrency':
				await CallbackController.selectCurrency({ctx, s});
				return;

				case 'rate':
				await CallbackController.rate({ctx, s});
				return;

				case 'menu':
				await CallbackController.menu({ctx, s});
				return;

				case 'account':
				await CallbackController.account({ctx, s});
				return;

				case 'wallets':
				await CallbackController.wallets({ctx, s});
				return;

				case 'selectAddress':
				await CallbackController.selectAddress({ctx, s});
				return;

				case 'monitoring':
				await CallbackController.monitoring({ctx, s});
				return;

				case 'editMonitoring':
				await CallbackController.editMonitoring({ctx, s});
				return;

				case 'premium':
				await CallbackController.premium({ctx, s});
				return;

				case 'settings':
				await CallbackController.settings({ctx, s});
				return;

				case 'addPhone':
				await CallbackController.addPhone({ctx, s});
				return;

				case 'addAddress':
				await CallbackController.addAddress({ctx, s});
				return;

				case 'dev':
				ctx.answerCbQuery('🧑‍💻 dev');
				return;


			}
			
		} catch(e){
			console.log(e);
		} finally{
			
			// если юзер пересколчил на другое сообщение не по теме
			if (ctx.userInfo.path) {
				let path = JSON.parse(ctx.userInfo.path);
				if (path.name === s[2]) return;
			}
			ctx.userInfo.path = null;
			await ctx.userInfo.save();
		}
	});

	global.Moon.on("contact", async (ctx) => {
		try{
			await ContactController.addPhoneInfo({ctx});
		} catch(e) {
			console.log(e);
		}
	});

});