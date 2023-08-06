const mongoose = require('mongoose');
const User = require('../Models/User')
const Market = require('../Models/Market')
const Currency = require('../Models/Currency')
const Notify = require('../Models/Notify')
const Address = require('../Models/Address')
const OrderAddress = require('../Models/OrderAddress');

const SMS = require('../Models/SMS')
const Explorer = require('../Models/Explorer')
const cronTemplates = require('../templates/cron');
const curSymbol = require('../helpers/templateHelper').currencies;
const Big = require('big.js');
Big.strict = true
class CronController {
	static async addAddress() {	
		try{
			let list = await Explorer.list();
			if (!list) return;
			for (let transaction of list){
				try{

					if (!(Array.isArray(transaction.sent) && transaction.sent.length === 0 && transaction.received.nanoton !== 0)) continue;
					if (transaction.received.message === '') continue;
					if (transaction.received.nanoton < 100000000) continue;
					let OrderId = transaction.received.message;
					if (!mongoose.Types.ObjectId.isValid(OrderId)) continue;
					
					let currentOrderAddress = await OrderAddress.getById(OrderId);
					if (!currentOrderAddress) continue;
					if (currentOrderAddress.payed) continue; // если куплено

					let currentUser = await User.isById(currentOrderAddress.userId);
					if (!currentUser) continue;

					currentOrderAddress.payed = true;
					let payedAddress = await currentOrderAddress.save();
				
					let create = await Address.create(currentUser._id, transaction.received.from);
					if (create && payedAddress) {
						currentUser.tm = new Big(currentUser.tm || '0').plus('0.1');
						await currentUser.save();
						global.CRON_i18n.setLocale(currentUser.locale);
						let addedAddressTemplate = cronTemplates.addedAddressTemplate(create.address);
						await global.Moon.telegram.sendMessage(currentUser.user_id, addedAddressTemplate.text, addedAddressTemplate.extra);
					
					}
		
					
				} catch(e) { console.log(e) };
			}
			

		} catch(e) {
			console.log(e);
			
		}
	}

	static async checkNotifies() {	
		try{
			let usdRate = await Currency.convert(1, 'TONCOIN', 'USD');
			if (!usdRate) return;
			let notifies = await Notify.getAll();
			for (let notify of notifies){
				try{
					if (usdRate.currency !== 'USD') continue;
					if ((notify.cond === 'b' && usdRate.amount >= notify.amount) || (notify.cond === 'm' && usdRate.amount <= notify.amount)) {
					
						notify.status = 2;
						notify.alert_sent = Date.now();
						await notify.save();
						global.CRON_i18n.setLocale(notify.userId.locale);

						let alertNotifyTemplate = cronTemplates.alertNotify(notify, usdRate);
						await global.Moon.telegram.sendMessage(notify.userId.user_id, alertNotifyTemplate.text, alertNotifyTemplate.extra);
						let ctx = {
							userInfo: {
								premium: notify.userId.premium
							}
						}
						let premium = await User.premium(ctx);
						if (notify.userId.phone && notify.userId.onPhone && premium) {
							SMS.send(notify.userId.phone, `Toncoin: $${usdRate.amountF} (telegram bot @TonMoonBot)`);
						}

						continue;
					}
					
				} catch(e){
					console.log(e);
				}
			
			}
			

		} catch(e) {
			console.log(e);
			
		}
	}


}

module.exports = CronController;