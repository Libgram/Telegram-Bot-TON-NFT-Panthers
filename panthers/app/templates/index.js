const curSymbol = require('../helpers/templateHelper').currencies;
const langSymbol = require('../helpers/templateHelper').flags;
module.exports = {
	selectLanguage(ctx) {
		let inline_keyboard = [
					[
						{text: '🇬🇧 English', callback_data: 'setLocale-en-0'},
						{text: '🇷🇺 Русский', callback_data: 'setLocale-ru-0'}
					],
					[
						{text: '🇺🇦 Український', callback_data: 'setLocale-uk-0'}
					],
				
					
				];

		if (ctx.userInfo.tutorial === -1) {
			inline_keyboard.push([{text: ctx.i18n.__('back'), callback_data: 'settings-0-0'}]);
		}

		return  {
			text: ctx.i18n.__('selectLanguage'),
			extra: {
				parse_mode: 'HTML',
				disable_web_page_preview: true,
				reply_markup:{
				inline_keyboard
			}}
		}			
	},

	selectCurrency(ctx) {
		let inline_keyboard = [
					[
						{text: '🇺🇸 USD', callback_data: 'setCurrency-USD-0'},
						{text: '🇪🇺 EUR', callback_data: 'setCurrency-EUR-0'},
						{text: '🇷🇺 RUB', callback_data: 'setCurrency-RUB-0'},
						{text: '🇺🇦 UAH', callback_data: 'setCurrency-UAH-0'}
					]
				
					
				];

		if (ctx.userInfo.tutorial === -1) {
			inline_keyboard.push([{text: ctx.i18n.__('back'), callback_data: 'settings-0-0'}]);
		}

		return  {
			text: ctx.i18n.__('selectCurrency'),
			extra: {
				parse_mode: 'HTML',
				disable_web_page_preview: true,
				reply_markup:{
				inline_keyboard
			}}
		}			
	},

	menu(ctx) {
		let inline_keyboard = [];
		inline_keyboard.push([{text: ctx.i18n.__('menu.buttons.presale'), callback_data: 'presale-0-0'}]);
	
			inline_keyboard.push([
				{text: '🌕 Channel', url: `https://t.me/MetaPanthers${ctx.userInfo.locale === 'ru' ? '_RU': ''}`},
				{text: '🌕 Website', url: `https://meta-panthers.com${ctx.userInfo.locale === 'ru' ? '/ru': ''}`},
			]);

			inline_keyboard.push([

				{text: '🌙 TonMoonBot', url: 'https://t.me/TonMoonBot/?start'},
			]);

			inline_keyboard.push([
				{text: ctx.i18n.__('menu.buttons.help'), url: 'https://t.me/TonMoonSupportBot'}
			]);
		
		
		
		return  {
			text: ctx.i18n.__('menu.main'),
			extra: {
				parse_mode: 'HTML',
				disable_web_page_preview: true,
				reply_markup:{
					inline_keyboard
			}}
		}			
	},



	selectNFT(ctx, hash, token, price){
		return  {
			text: ctx.i18n.__('selectNFT.main', {hash, price, id: token}),
			text: 'Presale ended!',
			extra: {
				parse_mode: 'HTML',
				disable_web_page_preview: true,
				reply_markup:{
				inline_keyboard:[
					[{text: ctx.i18n.__('menu.buttons.help'), url: 'https://t.me/TonMoonSupportBot'}],
					[{text: ctx.i18n.__('back'), callback_data: "presale-0-0"}]
					
				],
	
			}}
		}	
	},

	presale(ctx, list) {
		let inline_keyboard = [];
	
		inline_keyboard.push([{text: ctx.i18n.__('back'), callback_data: 'menu-0-0'}]);
		
		
		
		return  {
			text: ctx.i18n.__('presale.main'),
			text: 'Presale ended!',
			extra: {
				parse_mode: 'HTML',
				disable_web_page_preview: true,
				reply_markup:{
					inline_keyboard
			}}
		}			
	},

}