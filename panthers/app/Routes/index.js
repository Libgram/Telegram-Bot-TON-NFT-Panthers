const CommandController = require('../Controllers/CommandController')
const CallbackController = require('../Controllers/CallbackController')
const InputController = require('../Controllers/InputController')
module.exports = (() => {

	global.Moon.on("text", async (ctx) => {
		try{
			switch(ctx.message.text) {
			

				case '/menu':
				await CommandController.menu({ctx});
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
					// case 'addNotify':
					// await InputController.addNotify({ctx, path});
					// return;
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

			if (s[3]) {
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

				case 'menu':
				await CallbackController.menu({ctx, s});
				return;

				case 'presale':
				await CallbackController.presale({ctx, s});
				return;

				case 'selectNFT':
				await CallbackController.selectNFT({ctx, s});
				return;

				case 'genNFT':
				await CallbackController.genNFT({ctx, s});
				return;

				case 'setAddressMint':
				await CallbackController.setAddressMint({ctx, s});
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

	
});