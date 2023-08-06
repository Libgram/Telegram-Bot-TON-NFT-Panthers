const curSymbol = require('../helpers/templateHelper').currencies;
const langSymbol = require('../helpers/templateHelper').flags;
module.exports = {
	alertNotify(notify, currentRate) {
	
		return {
			text: global.CRON_i18n.__(`notify.alert.${notify.cond}`, {
				rate: `${Math.floor10(notify.amount, -2)}${curSymbol['USD']}`,
				currentRate: `${currentRate.amountF}${curSymbol[currentRate.currency]}`,
				
			}),
			extra: {
				parse_mode: 'HTML',
				disable_web_page_preview: true,
				reply_markup:{
				inline_keyboard:[
						[
							{text: global.CRON_i18n.__('rate.buttons.notifies'), callback_data: 'notifies-0-0'},
						],
					
				
					
				]
			}}
		}			
	},

	addedAddressTemplate(wallet) {
	
		return {
			text: global.CRON_i18n.__(`settings.addedAddress`, {
				wallet: wallet
			}),
			extra: {
				parse_mode: 'HTML',
				disable_web_page_preview: true,
				reply_markup:{
				inline_keyboard:[
						[
							{text: global.CRON_i18n.__('menu.buttons.account'), callback_data: 'account-0-0-1'}
						],
					
				
					
				]
			}}
		}			
	},
}