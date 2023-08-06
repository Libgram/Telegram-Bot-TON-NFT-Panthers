const User = require('../Models/User')
const Market = require('../Models/Market')
const Currency = require('../Models/Currency')
const Canvas = require('../Models/Canvas');
const Address = require('../Models/Address')
const templates = require('../templates');
const NFT = require('../Models/NFT')
class CommandController {
	static async start({ctx}) {	
		try{
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

	static async settings({ctx}) {	
		try{
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
				let settingsTemplate = templates.settings(ctx);
				await ctx.reply(settingsTemplate.text, settingsTemplate.extra);
				return;
			}
			

		} catch(e) {
			console.log(e);
		}
	}


	static async account({ctx}) {	
		try{
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
				let premium = await User.premium(ctx);
				let addresses = await Address.getByUser(ctx.userInfo._id);
				let addressesF = (Array.isArray(addresses) && addresses.length > 0) ? addresses.map(item => '*'+item.address.substr(-7)).join(',') : '*';
				let NFTs = [];
				if (Array.isArray(addresses) && addresses.length > 0) {
					NFTs = await NFT.getByAddresses(addresses.map(item => item._id));
				}

				let image = await Canvas.account({
					nft: Number(NFTs?.length),
					currency: ctx.userInfo.currency,
					userId: ctx.userInfo._id,
					name: ctx.userInfo.username || ctx.userInfo.first_name || 'Moon',
					premium: Boolean(premium)
				});
	
				
				let accountTemplate = templates.account(ctx, premium, addressesF, NFTs);
				if (!image) await ctx.reply(accountTemplate.text, accountTemplate.extra);
				else await ctx.replyWithPhoto({source:image}, {...accountTemplate.extra, caption:  accountTemplate.text})
				return;
			}
			

		} catch(e) {
			console.log(e);
		}
	}

	static async list({ctx}) {	
		try{
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
				
				let premium = await User.premium(ctx);
				let userMarkets = await User.getMarkets(ctx);
				let userMarketsSort = [];
				if (userMarkets && userMarkets.length > 0) {
					let awaitMarkets = userMarkets.map(async (market,index) => {
						
						if (market.premium && !premium) return;
						
						if (market.price) {
							let currency = await Currency.convert(market.price, market.currency, ctx.userInfo.currency);
							if (!currency) return;
							userMarketsSort.push({...market, price: currency.amountF, currency: currency.currency});
						}else{
							userMarketsSort.push({...market});
						}
					});
					await Promise.all(awaitMarkets);
					userMarketsSort.sort( ( a, b ) => {
						if (a.price === null) return 1;
						if (b.price === null) return -1;
						if ( a.price < b.price ) return -1;
						if ( a.price > b.price ) return 1;
						return 0;
					} );
				}
		
				
				let monitoringTemplate = templates.monitoring(ctx, userMarketsSort);
				await ctx.reply(monitoringTemplate.text, monitoringTemplate.extra);
				return;
			}
			

		} catch(e) {
			console.log(e);
		}
	}

	static async menu({ctx}) {	
		try{
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

	static async rate({ctx}) {	
		try{
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
				let usd = await Currency.convert(1, 'TONCOIN','USD');
				let localeRate = await Currency.convert(1, 'TONCOIN', ctx.userInfo.currency);

				if (!usd) {
					await ctx.reply(ctx.i18n.__('errors.request'));
					return;
				}

				let image = await Canvas.rate({
					currency: ctx.userInfo.currency,
					userId: ctx.userInfo._id,
					localeRate: localeRate,
					usdRate: usd
				});

				let rateTemplate = templates.rate(ctx, {amount: usd.amountF, currency: usd.currency}, {amount: localeRate.amountF, currency: localeRate.currency});
				
				if (!image) await ctx.reply(rateTemplate.text, rateTemplate.extra);
				else await ctx.replyWithPhoto({source:image}, {...rateTemplate.extra, caption:  rateTemplate.text})

				
				return
			}
			

		} catch(e) {
			console.log(e);
		}
	}



}

module.exports = CommandController;