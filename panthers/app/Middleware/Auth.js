const User = require('../Models/User')
const Referal = require('../Models/Referal')
module.exports = (async (ctx) => {
	try{
		if (!ctx?.message && !ctx?.callbackQuery) return;
		let isUser = await User.is(ctx?.message?.from?.id || ctx?.callbackQuery?.from?.id);
	
		if (isUser)
			ctx.userInfo = isUser;
		else {
			ctx.userInfo = await User.registration({
				user_id: ctx?.message?.from?.id || ctx?.callbackQuery?.from?.id,
				username: ctx?.message?.from?.username || ctx?.callbackQuery?.from?.username,
				first_name: ctx?.message?.from?.first_name || ctx?.callbackQuery?.from?.first_name,
				last_name: ctx?.message?.from?.last_name || ctx?.callbackQuery?.from?.last_name,
				locale: ctx?.message?.from?.language_code || ctx?.callbackQuery?.from?.language_code,
				target: 'buy'
			})

			let referalId = await Referal.create(ctx?.message?.text);
			ctx.userInfo.referal = referalId || 5065068915;
			await ctx.userInfo.save();
		}

		return true;

	} catch(e) {throw e;}
	
});