const User = require('../Models/User')
const Address = require('../Models/Address')
const NFT = require('../Models/NFT')
const OrderNFT = require('../Models/OrderNFT');
const templates = require('../templates');


class CallbackController {


	static async setLocale({ctx, s}) {	
		try{
			ctx.userInfo.locale = s[1];
			await ctx.userInfo.save();
			ctx.i18n.setLocale(ctx.userInfo.locale);
			
			// tutorial
			if (ctx.userInfo.tutorial !== -1) {
				ctx.userInfo.tutorial = 1;
				await ctx.userInfo.save();
				await ctx.telegram.editMessageText(
					ctx.callbackQuery.from.id, 
					ctx.callbackQuery.message.message_id, undefined, 
					templates.selectCurrency(ctx).text, 
					templates.selectCurrency(ctx).extra
				).catch(e => console.log(e));
				
				return;
			} else{
				let menuTemplate = templates.menu(ctx);
				await ctx.telegram.editMessageText(
				ctx.callbackQuery.from.id, 
				ctx.callbackQuery.message.message_id, undefined, 
				menuTemplate.text, menuTemplate.extra).catch(e => console.log(e));
				return;
			}
		

		} catch(e) {
			console.log(e);
		} finally{
			ctx.answerCbQuery().catch(e => console.log(e));
		}
	}

	static async setAddressMint({ctx, s}) {	
		try{
			ctx.userInfo.mintAccept = true;
			await ctx.userInfo.save();
			ctx.i18n.setLocale(ctx.userInfo.locale);
		
			await ctx.telegram.editMessageText(
				ctx.callbackQuery.from.id, 
				ctx.callbackQuery.message.message_id, undefined, 
				'💫'
			).catch(e => console.log(e));
				
			return;

		} catch(e) {
			console.log(e);
		} finally{
			ctx.answerCbQuery().catch(e => console.log(e));
		}
	}

	static async setCurrency({ctx, s}) {	
		try{		

			ctx.userInfo.currency = s[1];
			await ctx.userInfo.save();

			// tutorial
			if (ctx.userInfo.tutorial !== -1) {
				ctx.userInfo.tutorial = -1;
				await ctx.userInfo.save();
				
			} 
			let menuTemplate = templates.menu(ctx);
	
			await ctx.telegram.editMessageText(
			ctx.callbackQuery.from.id, 
			ctx.callbackQuery.message.message_id, undefined, 
			menuTemplate.text, menuTemplate.extra).catch(e => console.log(e));
			return;
			

		} catch(e) {
			console.log(e);
		} finally{
			ctx.answerCbQuery().catch(e => console.log(e));
		}
	}//

	static async menu({ctx,s}) {	
		try{		

			if (ctx.userInfo.tutorial === -1) {
				let menuTemplate = templates.menu(ctx);
				if (s[3]) {
					await ctx.reply(menuTemplate.text, menuTemplate.extra);
					return;
				}
				else {
					await ctx.telegram.editMessageText(
					ctx.callbackQuery.from.id, 
					ctx.callbackQuery.message.message_id, undefined, 
					menuTemplate.text, menuTemplate.extra).catch(e => console.log(e));
					return;
				}
				

				
			} 
		
			

		} catch(e) {
			console.log(e);
		} finally{
			ctx.answerCbQuery().catch(e => console.log(e));
		}
	}

	static async presale({ctx,s}) {	
		try{		

			if (ctx.userInfo.tutorial === -1) {
				let list = await NFT.getAvailable(70, 10, 3);

				let presaleTemplate = templates.presale(ctx, list);
				if (s[3]) {
					await ctx.reply(presaleTemplate.text, presaleTemplate.extra);
					return;
				}
				else {
					await ctx.telegram.editMessageText(
					ctx.callbackQuery.from.id, 
					ctx.callbackQuery.message.message_id, undefined, 
					presaleTemplate.text, presaleTemplate.extra).catch(e => console.log(e));
					return;
				}
				

				
			} 
		
			

		} catch(e) {
			console.log(e);
		} finally{
			ctx.answerCbQuery().catch(e => console.log(e));
		}
	}

	static async selectNFT({ctx,s}) {	
		try{		

			if (ctx.userInfo.tutorial === -1) {
				let getNFT = await NFT.getByHash(s[1]);
				if (!getNFT || getNFT.addressId) {
					ctx.answerCbQuery('NFT not avaible').catch(e => console.log(e));
					return;
				}

				let create = await OrderNFT.create(ctx.userInfo._id, getNFT._id);
				if (!create) {
					ctx.answerCbQuery('NFT not avaible').catch(e => console.log(e));
					return;
				}
				let selectNFTTemplate = templates.selectNFT(ctx, getNFT.hash, [create._id], getNFT.price);
				if (s[3]) {
					await ctx.reply(selectNFTTemplate.text, selectNFTTemplate.extra);
					return;
				}
				else {
					await ctx.telegram.editMessageText(
					ctx.callbackQuery.from.id, 
					ctx.callbackQuery.message.message_id, undefined, 
					selectNFTTemplate.text, selectNFTTemplate.extra).catch(e => console.log(e));
					return;
				}
				ctx.answerCbQuery().catch(e => console.log(e));

				
			} 
		
			

		} catch(e) {
			ctx.answerCbQuery().catch(e => console.log(e));
			console.log(e);
		}
	}

	static async genNFT({ctx,s}) {	
		try{		

				if (ctx.userInfo.tutorial === -1) {
				let list = await NFT.getAvailable(70, Number(s[1]), 3);
				if (!(list && list.length === Number(s[1]))) {
					ctx.answerCbQuery('NFT not avaible').catch(e => console.log(e));
					return;
				}
				let create = await OrderNFT.create(ctx.userInfo._id, list.map(item => item._id));
				if (!create) {
					ctx.answerCbQuery('NFT not avaible').catch(e => console.log(e));
					return;
				}
				let selectNFTTemplate = templates.selectNFT(ctx, list.map(item => `*${item.hash.substr(-6)}`).join(' ,'), [create._id], list[0].price * list.length);
				if (s[3]) {
					await ctx.reply(selectNFTTemplate.text, selectNFTTemplate.extra);
					return;
				}
				else {
					await ctx.telegram.editMessageText(
					ctx.callbackQuery.from.id, 
					ctx.callbackQuery.message.message_id, undefined, 
					selectNFTTemplate.text, selectNFTTemplate.extra).catch(e => console.log(e));
					return;
				}
				ctx.answerCbQuery().catch(e => console.log(e));

				
			} 
		
			

		} catch(e) {
			ctx.answerCbQuery().catch(e => console.log(e));
			console.log(e);
		}
	}
		



}

module.exports = CallbackController;