const User = require('../Models/User')
const Market = require('../Models/Market')
const Currency = require('../Models/Currency')
const Order = require('../Models/Order')
const Notify = require('../Models/Notify')
const Address = require('../Models/Address')
const OrderAddress = require('../Models/OrderAddress')
const NFT = require('../Models/NFT')
const templates = require('../templates');
const { CryptoPay, Assets, PaidButtonNames } = require('@foile/crypto-pay-api');
const Canvas = require('../Models/Canvas');
const symmetricCrypto = require("@hugoalh/symmetric-crypto");
const TonWeb = require('../Models/TonWeb');
const moment = require('moment');
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

	static async settings({ctx}) {	
		try{		

			if (ctx.userInfo.tutorial === -1) {
				let settingsTemplate = templates.settings(ctx);
	
				await ctx.telegram.editMessageText(
				ctx.callbackQuery.from.id, 
				ctx.callbackQuery.message.message_id, undefined, 
				settingsTemplate.text, settingsTemplate.extra).catch(e => console.log(e));
				return;

				
			} 
		
			

		} catch(e) {
			console.log(e);
		} finally{
			ctx.answerCbQuery().catch(e => console.log(e));
		}
	}

	static async addPhone({ctx}) {	
		try{		

			if (ctx.userInfo.tutorial === -1) {
				let addPhoneTemplate = templates.addPhone(ctx);
	
				await ctx.reply(addPhoneTemplate.text, addPhoneTemplate.extra)
				return;

				
			} 
		
			

		} catch(e) {
			console.log(e);
		} finally{
			ctx.answerCbQuery().catch(e => console.log(e));
		}
	}

	static async addAddress({ctx}) {	
		try{		

			if (ctx.userInfo.tutorial === -1) {
				let create = await OrderAddress.create(ctx.userInfo._id);
				if (!create) {
					ctx.answerCbQuery(ctx.i18n.__('errors.request')).catch(e => console.log(e));
					return;
				}

				let addAddressTemplate = templates.addAddress(ctx, create._id);
		

				await ctx.telegram.editMessageText(
				ctx.callbackQuery.from.id, 
				ctx.callbackQuery.message.message_id, undefined, 
				addAddressTemplate.text, addAddressTemplate.extra).catch(e => console.log(e));
				ctx.answerCbQuery().catch(e => console.log(e));
				return;

				
			} 
		
			

		} catch(e) {
			console.log(e);
			ctx.answerCbQuery().catch(e => console.log(e));
		}
	}


	static async premium({ctx, s}) {	
		try{		

			if (ctx.userInfo.tutorial === -1) {
				let premiumTemplate = templates.premium(ctx);
		

				if (s[3]) {
					await ctx.reply(premiumTemplate.text, premiumTemplate.extra);
					return;
				}
				else {
					await ctx.telegram.editMessageText(
					ctx.callbackQuery.from.id, 
					ctx.callbackQuery.message.message_id, undefined, 
					premiumTemplate.text, premiumTemplate.extra).catch(e => console.log(e));
					return;
				}

				
			} 
		
			

		} catch(e) {
			console.log(e);
		} finally{
			ctx.answerCbQuery().catch(e => console.log(e));
		}
	}

	static async selectAddress({ctx, s}) {	
		try{		

			if (ctx.userInfo.tutorial === -1) {

				let address = await Address.get(s[1]);
				if (!address || String(address.userId) !== String(ctx.userInfo._id)) {
					ctx.answerCbQuery(ctx.i18n.__('errors.AddressNotFound')).catch(e => console.log(e));
					return;
				}

				
				let name = address.name ? ': ' +address.name : ''
				let balance = 0;
				let balanceLocale = null;
				let version = '';
				let status = '';
				try{
					let data = await TonWeb.getWallet(address.address);
					if (!data) throw new Error('no data');
					balance = Number(data.balance);
					version = data.wallet_type;
					let transactions = await TonWeb.getTransactions(address.address);
					if (transactions && transactions.length > 0) {
						if (transactions[0]?.utime) {
							moment.locale(ctx.userInfo.locale)
							status = moment(transactions[0]?.utime * 1000).fromNow();
						}
					}
					if (balance > 0) {
						balanceLocale = await Currency.convert(balance / 1000000000, 'TONCOIN', ctx.userInfo.currency);
					}
				} catch(e) {console.log(e)}

				let selectAddressTemplate = templates.selectAddress(ctx, address, balance, balanceLocale, name, status, version);
				await ctx.telegram.editMessageText(
				ctx.callbackQuery.from.id, 
				ctx.callbackQuery.message.message_id, undefined, 
				selectAddressTemplate.text, selectAddressTemplate.extra).catch(e => console.log(e));
				ctx.answerCbQuery().catch(e => console.log(e));
				return;
				
			} 
		
			

		} catch(e) {
			ctx.answerCbQuery().catch(e => console.log(e));
			console.log(e);
		}
	}

	static async wallets({ctx, s}) {	
		try{		

			if (ctx.userInfo.tutorial === -1) {

				let totalBalance = 0;
				let addresses = await Address.getByUser(ctx.userInfo._id);
				let addressesF = [];
				if (Array.isArray(addresses) && addresses.length > 0) {
				
					let awaitAddresses = addresses.map(async (item, key) => {
						let balance = 0;
						let balanceLocale = null;
						
						try{
							balance = await TonWeb.getWallet(item.address);
							balance = Number(balance.balance)
							if (balance > 0) {
								totalBalance += +balance;
								balanceLocale = await Currency.convert(balance / 1000000000, 'TONCOIN', ctx.userInfo.currency);
							}
						} catch(e) {console.log(e)}

						

						addressesF.push({
							_id: item._id,
							address: item.address,
							name: item.name || ''+item.address.substr(-7),
							show: item.show,
							balance: balance > 0 ? balance : 0,
							balanceLocale: balanceLocale
						});
					});
					await Promise.all(awaitAddresses);
				}

				addressesF.sort( ( a, b ) => {
					if (a.balance === null) return 1;
					if (b.balance === null) return -1;
					if ( a.balance > b.balance ) return -1;
					if ( a.balance < b.balance ) return 1;
					return 0;
				} );
	
				let totalBalanceLocale = null;
				if (totalBalance > 0) {
					totalBalanceLocale = await Currency.convert(totalBalance / 1000000000, 'TONCOIN', ctx.userInfo.currency);
				}

				let walletsTemplate = templates.wallets(ctx, addressesF, totalBalance, totalBalanceLocale);
		

				if (s[3]) {
					await ctx.reply(walletsTemplate.text, walletsTemplate.extra);
					return;
				}
				else {
					await ctx.telegram.editMessageText(
					ctx.callbackQuery.from.id, 
					ctx.callbackQuery.message.message_id, undefined, 
					walletsTemplate.text, walletsTemplate.extra).catch(e => console.log(e));
					return;
				}

				
			} 
		
			

		} catch(e) {
			console.log(e);
		} finally{
			ctx.answerCbQuery().catch(e => console.log(e));
		}
	}

	static async buyPremium({ctx, s}) {	
		try{		

			if (ctx.userInfo.tutorial === -1) {
				let currentOrder = await Order.is(ctx.userInfo._id, 'cryptobot', s[1]);
				if (!currentOrder) {
					currentOrder = await Order.create(ctx.userInfo._id, 'cryptobot', s[1]);	
					const cryptoPay = new CryptoPay(process.env.CRYPTO_TOKEN);
					const invoice = await cryptoPay.createInvoice(Assets.TON, process.env[`PRICE_TON_${s[1]}`], {
					    description: ctx.i18n.__(`account.premium.description`, {month: s[1]}),
					    paid_btn_name: PaidButtonNames.OPEN_BOT,
					    paid_btn_url: 'https://t.me/tonmoonbot',
					    payload: String(currentOrder._id),

					  });
					if (!invoice) throw new Error('cryptobot createInvoice error');
					currentOrder.data = invoice.pay_url;
					await currentOrder.save();
				}
				
				let buyPremiumTemplate = templates.buyPremium(ctx, currentOrder.data);
				
				await ctx.telegram.editMessageText(
				ctx.callbackQuery.from.id, 
				ctx.callbackQuery.message.message_id, undefined, 
				buyPremiumTemplate.text, buyPremiumTemplate.extra).catch(e => console.log(e));
				return;

				
			} 
		
			

		} catch(e) {
			console.log(e);
		} finally{
			ctx.answerCbQuery().catch(e => console.log(e));
		}
	}

	static async selectLanguage({ctx}) {	
		try{		

			if (ctx.userInfo.tutorial === -1) {
				let selectLanguageTemplate = templates.selectLanguage(ctx);
				await ctx.telegram.editMessageText(
				ctx.callbackQuery.from.id, 
				ctx.callbackQuery.message.message_id, undefined, 
				selectLanguageTemplate.text, selectLanguageTemplate.extra).catch(e => console.log(e));
				return;

				
			} 
		
			

		} catch(e) {
			console.log(e);
		} finally{
			ctx.answerCbQuery().catch(e => console.log(e));
		}
	}

	static async selectCurrency({ctx}) {	
		try{		

			if (ctx.userInfo.tutorial === -1) {
				let selectCurrencyTemplate = templates.selectCurrency(ctx);
				await ctx.telegram.editMessageText(
				ctx.callbackQuery.from.id, 
				ctx.callbackQuery.message.message_id, undefined, 
				selectCurrencyTemplate.text, selectCurrencyTemplate.extra).catch(e => console.log(e));
				return;

				
			} 
		
			

		} catch(e) {
			console.log(e);
		} finally{
			ctx.answerCbQuery().catch(e => console.log(e));
		}
	}

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


	static async account({ctx}) {	
		try{		
			
			if (ctx.userInfo.tutorial === -1) {
				let premium = await User.premium(ctx);
				let addresses = await Address.getByUser(ctx.userInfo._id);
				let addressesF = (Array.isArray(addresses) && addresses.length > 0) ? addresses.map(item => '*'+item.address.substr(-7)).join(', ') : '*';
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
		} finally{
			ctx.answerCbQuery().catch(e => console.log(e));
		}
	}

	static async rate({ctx}) {	
		try{		

			if (ctx.userInfo.tutorial === -1) {
				let usd = await Currency.convert(1, 'TONCOIN','USD');
				let localeRate = await Currency.convert(1, 'TONCOIN', ctx.userInfo.currency);

				if (!usd || !localeRate) {
					ctx.answerCbQuery(ctx.i18n.__('errors.request')).catch(e => console.log(e));
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
				ctx.answerCbQuery().catch(e => console.log(e));

				return;

				
			} 
		
			

		} catch(e) {
			ctx.answerCbQuery().catch(e => console.log(e));
			console.log(e);
		}
	}

	static async monitoring({ctx, s}) {	
		try{		

			if (ctx.userInfo.tutorial === -1) {
				if (['buy', 'sell'].indexOf(s[1]) !== -1) {
					ctx.userInfo.target = s[1];
					await ctx.userInfo.save();
				}

				let premium = await User.premium(ctx);
				let userMarkets = await User.getMarkets(ctx);
				let userMarketsSort = [];
				if (userMarkets && userMarkets.length > 0) {
					let awaitMarkets = userMarkets.map(async (market,index) => {

						if (market.premium && !premium) return;

						if (market.price) {
							let currency = await Currency.convert(market.price, market.currency, ctx.userInfo.currency);
							userMarketsSort.push({...market, price: currency.amountF, currency: currency.currency});
						}else{
							userMarketsSort.push({...market});
						}
					});
					await Promise.all(awaitMarkets);
					if (ctx.userInfo.target === 'buy') {
						userMarketsSort.sort( ( a, b ) => {
							if (a.price === null) return 1;
							if (b.price === null) return -1;
							if ( a.price < b.price ) return -1;
							if ( a.price > b.price ) return 1;
							return 0;
						} );
					} else {
						userMarketsSort.sort( ( a, b ) => {
							if (a.price === null) return 1;
							if (b.price === null) return -1;
							if ( a.price > b.price ) return -1;
							if ( a.price < b.price ) return 1;
							return 0;
						} );
					}
					
				}
		
				
				let monitoringTemplate = templates.monitoring(ctx, userMarketsSort);
				await ctx.telegram.editMessageText(
				ctx.callbackQuery.from.id, 
				ctx.callbackQuery.message.message_id, undefined, 
				monitoringTemplate.text, monitoringTemplate.extra).catch(e => console.log(e));
				return;
				
			} 
		
			

		} catch(e) {
			console.log(e);
		} finally{
			ctx.answerCbQuery().catch(e => console.log(e));
		}
	}

	static async editMonitoring({ctx, s}) {	
		try{		

			if (ctx.userInfo.tutorial === -1) {
				if (['buy', 'sell'].indexOf(s[1]) !== -1) {
					ctx.userInfo.target = s[1];
					await ctx.userInfo.save();
				}
				
				let markets = await Market.getAll(ctx);
				let userMarkets = await User.getMarkets(ctx);

				let editMonitoringTemplate = templates.editMonitoring(ctx, markets, userMarkets);
				await ctx.telegram.editMessageText(
				ctx.callbackQuery.from.id, 
				ctx.callbackQuery.message.message_id, undefined, 
				editMonitoringTemplate.text, editMonitoringTemplate.extra).catch(e => console.log(e));
				return;
				
			} 
		
			

		} catch(e) {
			console.log(e);
		} finally{
			ctx.answerCbQuery().catch(e => console.log(e));
		}
	}

	static async addMarket({ctx, s}) {	
		try{		

			if (ctx.userInfo.tutorial === -1) {

				let market = await Market.get(ctx, s[1]);
				if (market) {
					let index = ctx.userInfo.markets.indexOf(s[1]);
					if (index === -1) {
						let premium = await User.premium(ctx);
						if (market.premium === true && !premium) {
							ctx.answerCbQuery(ctx.i18n.__('notifications.premiumNeeded')).catch(e => console.log(e));
							return;
						}
						ctx.userInfo.markets.push(s[1]);
						await ctx.userInfo.save();
						ctx.answerCbQuery(ctx.i18n.__('notifications.marketAdd')).catch(e => console.log(e));
					}
					else{
						ctx.answerCbQuery(ctx.i18n.__('errors.marketAdded')).catch(e => console.log(e));
					}
					
				}
				else{
					ctx.answerCbQuery(ctx.i18n.__('errors.marketNotFound')).catch(e => console.log(e));
				}
				

				let markets = await Market.getAll(ctx);
				let userMarkets = await User.getMarkets(ctx);
				let editMonitoringTemplate = templates.editMonitoring(ctx, markets, userMarkets);
				await ctx.telegram.editMessageText(
				ctx.callbackQuery.from.id, 
				ctx.callbackQuery.message.message_id, undefined, 
				editMonitoringTemplate.text, editMonitoringTemplate.extra).catch(e => console.log(e));
				return;
				
			} 
		
			

		} catch(e) {
			ctx.answerCbQuery().catch(e => console.log(e));
			console.log(e);
		}
	}

	static async setAddressShow({ctx, s}) {	
		try{		

			if (ctx.userInfo.tutorial === -1) {
				let data = null;
				try{
					data = JSON.parse(s[1]);
					if (!data) throw 'no data';
				} catch(e) {
					ctx.answerCbQuery(ctx.i18n.__('errors.request')).catch(e => console.log(e));
					return;
				}

				let address = await Address.get(data._id);
				if (address && String(address.userId) === String(ctx.userInfo._id)) {
					address.show = data.show;
					await address.save();
					ctx.answerCbQuery(ctx.i18n.__('notifications.editStatus')).catch(e => console.log(e));

					
				}
				else{
					ctx.answerCbQuery(ctx.i18n.__('errors.addressNotFound')).catch(e => console.log(e));
					return;
				}


				let name = address.name ? ': ' +address.name : ''
				let balance = 0;
				let balanceLocale = null;
				let version = '';
				let status = '';
				try{
					let data = await TonWeb.getWallet(address.address);
					if (!data) throw new Error('no data');
					balance = Number(data.balance);
					version = data.wallet_type;
					let transactions = await TonWeb.getTransactions(address.address);
					if (transactions && transactions.length > 0) {
						if (transactions[0]?.utime) {
							moment.locale(ctx.userInfo.locale)
							status = moment(transactions[0]?.utime * 1000).fromNow();
						}
					}
					if (balance > 0) {
						balanceLocale = await Currency.convert(balance / 1000000000, 'TONCOIN', ctx.userInfo.currency);
					}
				} catch(e) {console.log(e)}

				let selectAddressTemplate = templates.selectAddress(ctx, address, balance, balanceLocale, name, status, version);
				await ctx.telegram.editMessageText(
				ctx.callbackQuery.from.id, 
				ctx.callbackQuery.message.message_id, undefined, 
				selectAddressTemplate.text, selectAddressTemplate.extra).catch(e => console.log(e));
				ctx.answerCbQuery().catch(e => console.log(e));
				return;
				

			
				
				
			} 
		
			

		} catch(e) {
			ctx.answerCbQuery().catch(e => console.log(e));
			console.log(e);
		}
	}

	static async setAddressName({ctx, s}) {	
		try{		

			if (ctx.userInfo.tutorial === -1) {
				ctx.userInfo.path = JSON.stringify({
					name: 'setAddressName',
					type: String(s[1]),

				})
				await ctx.userInfo.save();


				let setAddressNameTemplate = templates.setAddressName(ctx, String(s[1]));
				await ctx.telegram.editMessageText(
				ctx.callbackQuery.from.id, 
				ctx.callbackQuery.message.message_id, undefined, 
				setAddressNameTemplate.text, setAddressNameTemplate.extra).catch(e => console.log(e));
				ctx.answerCbQuery().catch(e => console.log(e));
				 return;
				
				
			} 
		
			

		} catch(e) {
			ctx.answerCbQuery().catch(e => console.log(e));
			console.log(e);
		}
	}


	static async addNotify({ctx, s}) {	
		try{		

			if (ctx.userInfo.tutorial === -1) {
				ctx.userInfo.path = JSON.stringify({
					name: 'addNotify',
					type: s[1],

				})
				await ctx.userInfo.save();

				let addNotifyTemplate = templates.addNotify(ctx, s[1]);

				if (s[3]) {
					await ctx.reply(addNotifyTemplate.text, addNotifyTemplate.extra);
					return;
				}
				else {
					await ctx.telegram.editMessageText(
					ctx.callbackQuery.from.id, 
					ctx.callbackQuery.message.message_id, undefined, 
					addNotifyTemplate.text, addNotifyTemplate.extra).catch(e => console.log(e));
					return;
				}
				
				
			} 
		
			

		} catch(e) {
			console.log(e);
		} finally{
			ctx.answerCbQuery().catch(e => console.log(e));
		}
	}

	static async removeNotify({ctx, s}) {	
		try{		

			if (ctx.userInfo.tutorial === -1) {
				let currentNotify = await Notify.get(s[1]);
				if (!currentNotify) {
					ctx.answerCbQuery(ctx.i18n.__('notifications.notifyNotFound')).catch(e => console.log(e));
				}else{
					currentNotify.status = -1;
					await currentNotify.save();
					ctx.answerCbQuery(ctx.i18n.__('notifications.notifyRemove')).catch(e => console.log(e));
				}

				let userNotifies = await Notify.getByUser(ctx);
				let userNotifiesSort  = [];
				if (userNotifies && userNotifies.length > 0) {
					let notifiesAwait = userNotifies.map(async (notify) => {
						if (ctx.userInfo.currency !== 'USD') {
							let currency = await Currency.convert(notify.amount, 'USD', ctx.userInfo.currency);
							if (!currency) return;
							userNotifiesSort.push({ 
								localeRate: {
									amount: currency.amount,
									currency: currency.currency
								},
								usdRate: {
									amount: notify.amount,
									currency: 'USD'
								},
								to: notify.to, _id: notify._id, cond: notify.cond
							});
						}else{
							userNotifiesSort.push({ 
								localeRate: {
									amount: notify.amount,
									currency: 'USD'
								},
								to: notify.to, _id: notify._id, cond: notify.cond});
						}
				
					})
					await Promise.all(notifiesAwait);
				}


				let notifiesTemplate = templates.notifies(ctx, userNotifiesSort);
				await ctx.telegram.editMessageText(
				ctx.callbackQuery.from.id, 
				ctx.callbackQuery.message.message_id, undefined, 
				notifiesTemplate.text, notifiesTemplate.extra).catch(e => console.log(e));
				
				return;
				
			} 
		
			

		} catch(e) {
			ctx.answerCbQuery().catch(e => console.log(e));
			console.log(e);
		}
	}

	static async onPhone({ctx, s}) {	
		try{		

			if (ctx.userInfo.tutorial === -1) {
				
				let premium = await User.premium(ctx);
				if (!premium) {
					ctx.answerCbQuery(ctx.i18n.__('notifications.premiumNeeded')).catch(e => console.log(e));
					return;
				}

				if (!ctx.userInfo.phone) {
					ctx.answerCbQuery(ctx.i18n.__('notifications.phoneNeeded')).catch(e => console.log(e));
					return;
				}

				ctx.userInfo.onPhone = s[1];
				await ctx.userInfo.save();

				await CallbackController.notifies({ctx,s});
			}
		} catch(e) {
			console.log(e);
		}
	}



	static async notifies({ctx, s}) {	
		try{		

			if (ctx.userInfo.tutorial === -1) {
				let userNotifies = await Notify.getByUser(ctx);
				let userNotifiesSort  = [];
				if (userNotifies && userNotifies.length > 0) {
					let notifiesAwait = userNotifies.map(async (notify) => {
						if (ctx.userInfo.currency !== 'USD') {
							let currency = await Currency.convert(notify.amount, 'USD', ctx.userInfo.currency);
							if (!currency) return;
							userNotifiesSort.push({ 
								localeRate: {
									amount: currency.amount,
									currency: currency.currency
								},
								usdRate: {
									amount: notify.amount,
									currency: 'USD'
								},
								to: notify.to, _id: notify._id, cond: notify.cond
							});
						}else{
							userNotifiesSort.push({ 
								localeRate: {
									amount: notify.amount,
									currency: 'USD'
								},
								to: notify.to, _id: notify._id, cond: notify.cond});
						}
				
					})
					await Promise.all(notifiesAwait);
				}


				let notifiesTemplate = templates.notifies(ctx, userNotifiesSort);
				if (s[3]) {
					await ctx.reply(notifiesTemplate.text, notifiesTemplate.extra);
					return;
				}
				else {
					await ctx.telegram.editMessageText(
					ctx.callbackQuery.from.id, 
					ctx.callbackQuery.message.message_id, undefined, 
					notifiesTemplate.text, notifiesTemplate.extra).catch(e => console.log(e));
					ctx.answerCbQuery().catch(e => console.log(e));
					return;
				}
				
				
			} 
		
			

		} catch(e) {
			ctx.answerCbQuery().catch(e => console.log(e));
			console.log(e);
		}
	}

	static async selectMarket({ctx, s}) {	
		try{		

			if (ctx.userInfo.tutorial === -1) {

				let market = await Market.get(ctx, s[1]);
				if (!market) {
					ctx.answerCbQuery(ctx.i18n.__('errors.marketNotFound')).catch(e => console.log(e));
					return;
				}

				let pairsForTemplate = [];

				if (market && market.pairs) {
					let awaitPairs = market.pairs.map(async (pair, index) => {
						let pairNormal = {
							number: index+1,
							source: pair.sourceId.source,
							direction: `${pair.from} -> ${pair.to}`,
							type: pair.sourceId.type,
							category: pair.category,
							pair: pair.pair,
							name: pair.name || '',
							from: pair.from,
							url: pair.url || pair.sourceId.url,
						};
						let price = ((Date.now() - pair.price_update) / 1000 <= process.env.OLD_PAIR) ? pair.price : null;				
						if (price) {
							let currency = await Currency.convert(price, pair.currency, ctx.userInfo.currency);	
							if (!currency) return;
							pairsForTemplate.push({...pairNormal,  price: currency.amountF, currency: currency.currency});
						}
						else pairsForTemplate.push(pairNormal);
					});

					await Promise.all(awaitPairs);

				}

				let selectMarketTemplate = templates.selectMarket(ctx, pairsForTemplate);
				await ctx.telegram.editMessageText(
				ctx.callbackQuery.from.id, 
				ctx.callbackQuery.message.message_id, undefined, 
				selectMarketTemplate.text, selectMarketTemplate.extra).catch(e => console.log(e));
				ctx.answerCbQuery().catch(e => console.log(e));
				return;
				
			} 
		
			

		} catch(e) {
			ctx.answerCbQuery().catch(e => console.log(e));
			console.log(e);
		}
	}

	static async removeMarket({ctx, s}) {	
		try{		

			if (ctx.userInfo.tutorial === -1) {

				let market = await Market.get(ctx, s[1]);

				let index = ctx.userInfo.markets.indexOf(s[1]);
				if (index !== -1) {
					ctx.userInfo.markets.splice(index, 1);
					await ctx.userInfo.save();
					ctx.answerCbQuery(ctx.i18n.__('notifications.marketRemove')).catch(e => console.log(e));
				}
				else{
					ctx.answerCbQuery(ctx.i18n.__('errors.marketNotFound')).catch(e => console.log(e));
				}
				


				let markets = await Market.getAll(ctx);
				let userMarkets = await User.getMarkets(ctx);
				let editMonitoringTemplate = templates.editMonitoring(ctx, markets, userMarkets);
				await ctx.telegram.editMessageText(
				ctx.callbackQuery.from.id, 
				ctx.callbackQuery.message.message_id, undefined, 
				editMonitoringTemplate.text, editMonitoringTemplate.extra).catch(e => console.log(e));
				return;
				
			} 
		
			

		} catch(e) {
			ctx.answerCbQuery().catch(e => console.log(e));
			console.log(e);
		}
	}



}

module.exports = CallbackController;