const curSymbol = require('../helpers/templateHelper').currencies;
const langSymbol = require('../helpers/templateHelper').flags;
module.exports = {
	selectLanguage(ctx) {
		let inline_keyboard = [
					[
						{text: '🇬🇧 English', callback_data: 'setLocale-en-0'},
						{text: '🇪🇸 Español', callback_data: 'setLocale-es-0'}
					],
					[
						
						{text: '🇷🇺 Русский', callback_data: 'setLocale-ru-0'},
						{text: '🇺🇦 Українська', callback_data: 'setLocale-uk-0'}
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
		inline_keyboard.push([{text: ctx.i18n.__('menu.buttons.monitoring'), callback_data: 'monitoring-0-0'},
			{text: ctx.i18n.__('menu.buttons.rate'), callback_data: 'rate-0-0-1'},
			]);
	
		inline_keyboard.push([
			{text: ctx.i18n.__('menu.buttons.account'), callback_data: 'account-0-0-1'},
			{text: ctx.i18n.__('account.buttons.wallets'), callback_data: 'wallets-0-0'}
		]);

		inline_keyboard.push([
			{text: '🐈‍⬛ Meta Panthers', url: 'https://t.me/MetaPanthersBot/?start'},
		]);

		inline_keyboard.push([
			{text: ctx.i18n.__('menu.buttons.settings'), callback_data: 'settings-0-0'},
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

	account(ctx,premium, addresses, nft) {
		let inline_keyboard = [];
		inline_keyboard.push([
			{text: ctx.i18n.__('account.buttons.buy'), callback_data: 'premium-0-0-1'},
		]);

		for(let n of nft){
			inline_keyboard.push([
				{text: '💠 *' + n.hash.substr(-7), url: `https://tonmoon.org/public/nfts/${n.hash}.png`},
			]);
		}

		inline_keyboard.push([
			{text: ctx.i18n.__('back'), callback_data: 'menu-0-0-1'},
		]);

		return  {
			text: ctx.i18n.__('account.main', {username: ctx.userInfo.username, premium: Number(premium), wallets: addresses, nft: nft?.length || 0}),
			extra: {
				parse_mode: 'HTML',
				disable_web_page_preview: true,
				reply_markup:{
					inline_keyboard
				}
			}
		}			
	},

	premium(ctx) {

		return  {
			text: ctx.i18n.__('account.premium.main'),
			extra: {
				parse_mode: 'HTML',
				disable_web_page_preview: true,
				reply_markup:{
				inline_keyboard:[
						[
							{text: '🌘 '+ctx.i18n.__('account.premium.buttons.month', {month: 1, price: process.env[`PRICE_TON_1`]}), callback_data: 'buyPremium-1-0'}
						],
						[
							{text: '🌗 '+ctx.i18n.__('account.premium.buttons.month', {month: 3, price: process.env[`PRICE_TON_3`]}), callback_data: 'buyPremium-3-0'}
						],
						[
							{text: '🌕 '+ctx.i18n.__('account.premium.buttons.month', {month: 12, price: process.env[`PRICE_TON_12`]}), callback_data: 'buyPremium-12-0'}
						],
						
						[
							
							{text: ctx.i18n.__('back'), callback_data: 'account-0-0-1'},
						]
					
				
					
				]
			}}
		}
	},

	wallets(ctx, wallets, totalBalance, totalBalanceLocale) {
		let inline_keyboard = [];
		let link = 'https://tonmoon.org/explorer/';
		if (Array.isArray(wallets) && wallets.length > 0) {
			if (ctx.userInfo.username) {
				link += ctx.userInfo.username;
			}
			wallets.map(item => {
				let balance = item.balance > 0 ? ` · ${Math.floor10(item.balance/1000000000,-2)} TON` : '';
				
				if (item.balanceLocale) {
					balance += ` (${item.balanceLocale.amountF}${curSymbol[item.balanceLocale.currency]})`;
				}
				inline_keyboard.push([
					{text: `${item.name}${balance} · ${item.show ? '🌕' : '🌑'}`, callback_data: `selectAddress-${item._id}-0`}
				])
			});
		}

		inline_keyboard.push([
			{text: ctx.i18n.__('settings.buttons.addAddress'), callback_data: 'addAddress-0-0'},
		])

		inline_keyboard.push([ {text: ctx.i18n.__('back'), callback_data: 'menu-0-0'} ])

		let totalBalanceText = totalBalance > 0 ? `${Math.floor10(totalBalance/1000000000,-2)} TON` : '0 TON';
				
		if (totalBalanceLocale) {
			totalBalanceText += ` (${totalBalanceLocale.amountF}${curSymbol[totalBalanceLocale.currency]})`;
		}
		return  {
			text: ctx.i18n.__('account.wallets.main', {totalBalance: totalBalanceText, link}),
			extra: {
				parse_mode: 'HTML',
				disable_web_page_preview: true,
				reply_markup:{
					inline_keyboard				
				
			}}
		}			
	},

	selectAddress(ctx, address, balance, balanceLocale, name, status, version) {
		let link = 'https://tonmoon.org/explorer/';
		if (address.show) {
			link += address.address;
		}

	let inline_keyboard = [];
		inline_keyboard.push([
			{text: ctx.i18n.__('account.wallets.selectAddress.buttons.name'), callback_data: `setAddressName-${address._id}-setAddressName`}
		]);

		if (address.show) {
			inline_keyboard.push([
				{text: ctx.i18n.__('account.wallets.selectAddress.buttons.hide'), callback_data: `setAddressShow-${JSON.stringify({_id: address._id, show: false})}-0`}
			]);
		}else{
			inline_keyboard.push([
				{text: ctx.i18n.__('account.wallets.selectAddress.buttons.show'), callback_data: `setAddressShow-${JSON.stringify({_id: address._id, show: true})}-0`}
			]);
		}

		inline_keyboard.push([
			{text: ctx.i18n.__('back'), callback_data: 'wallets-0-0'},
		]);
		let bal = balance > 0 ? `${Math.floor10(balance/1000000000,-2)} TON` : '';
		
		if (balanceLocale) {
			bal += ` (${balanceLocale.amountF}${curSymbol[balanceLocale.currency]})`;
		}
	


		return  {
			text: ctx.i18n.__('account.wallets.selectAddress.main', {link, balance: bal, name: name, address: address.address, version: version, status: status}),
			extra: {
				parse_mode: 'HTML',
				disable_web_page_preview: true,
				reply_markup:{
					inline_keyboard			
				
			}}
		}			
	},

	buyPremium(ctx, url) {

		return  {
			text: ctx.i18n.__('account.premium.buy.main'),
			extra: {
				parse_mode: 'HTML',
				disable_web_page_preview: true,
				reply_markup:{
				inline_keyboard:[
						[
							{text: ctx.i18n.__('account.premium.buy.buttons.method', {source: 'CryptoBot'}), url: url}
						],
						
						[
							
							{text: ctx.i18n.__('back'), callback_data: 'premium-0-0'},
						]
					
				
					
				]
			}}
		}			
	},

	rate(ctx, usdCurrency, localeCurrency) {
		return {
			text: ctx.i18n.__('rate.main', {
				rateLocale: `${localeCurrency.amount}${curSymbol[localeCurrency.currency]}`,
			 	rate: usdCurrency.currency === localeCurrency.currency ? '' : `(${usdCurrency.amount}${curSymbol[usdCurrency.currency]})`
			}),
			extra: {
				parse_mode: 'HTML',
				disable_web_page_preview: true,
				reply_markup:{
				inline_keyboard:[
						[
							{text: ctx.i18n.__('rate.buttons.addNotify'), callback_data: 'addNotify-%-addNotify-1'},
						],
						[
							{text: ctx.i18n.__('rate.buttons.notifies'), callback_data: 'notifies-0-0-1'},
						],
						[
							{text: ctx.i18n.__('back'), callback_data: 'menu-0-0-1'},
						]
					
				
					
				]
			}}
		}			
	},


	notifies(ctx, notifies) {
		let text = ctx.i18n.__('notify.main.empty');
		let inline_keyboard = [];
		let listNotifies = [];
		if (notifies && notifies.length > 0) {
			text = ctx.i18n.__(`notify.main.list`);
			// ·
			notifies.forEach(notify => {
				//✉️ + 📲
				let cond = notify.cond === 'b' ? '📈' : '📉';
				let text = `${cond} ${Math.floor10(notify.localeRate.amount, -2) }${curSymbol[notify.localeRate.currency]}`
				if (ctx.userInfo.currency !== 'USD') text += ` (${Math.floor10(notify.usdRate.amount, -2)}${curSymbol[notify.usdRate.currency]})`;
				listNotifies.push({text: text, callback_data: `removeNotify-${notify._id}`});
			});
			let size = 2;

			for (let i = 0; i <Math.ceil(listNotifies.length/size); i++){
			    inline_keyboard[i] = listNotifies.slice((i*size), (i*size) + size);
			}
				
			
		}
	
		inline_keyboard.push([{text: ctx.i18n.__('rate.buttons.addNotify'), callback_data: 'addNotify-%-addNotify'}]);
		if (ctx.userInfo.onPhone) {
			inline_keyboard.push([{text: ctx.i18n.__('rate.buttons.offPhone'), callback_data: 'onPhone-0-0'}]);
		} else{
			inline_keyboard.push([{text: ctx.i18n.__('rate.buttons.onPhone'), callback_data: 'onPhone-1-0'}]);
		}
		inline_keyboard.push([{text: ctx.i18n.__('back'), callback_data: "rate-0-0-1"}]);

		return  {
			text: text,
			extra: {
			parse_mode: 'HTML',
			disable_web_page_preview: true,
			reply_markup:{
				inline_keyboard	
			}
		}
		}			
	},

	addNotify(ctx, type) {
		let currencies = 
		[
			{text: type === '%' ? ' · % · ' : '%', callback_data: 'addNotify-%-addNotify'},
			{text: type === ctx.userInfo.currency ? ` · ${curSymbol[ctx.userInfo.currency]} · ` : curSymbol[ctx.userInfo.currency], callback_data: `addNotify-${ctx.userInfo.currency}-addNotify`},
		];
		if (ctx.userInfo.currency !== 'USD') currencies.push({text: type === 'USD' ? ` · ${curSymbol['USD']} · ` : curSymbol['USD'], callback_data: `addNotify-USD-addNotify`});
		return {
			text: ctx.i18n.__('notify.add.main'),
			extra: {
				parse_mode: 'HTML',
				disable_web_page_preview: true,
				reply_markup:{
				inline_keyboard:[
						currencies,

						[
							{text: ctx.i18n.__('back'), callback_data: 'rate-0-0-1'},
						]
					
				
					
				]
			}}
		}			
	},

	addedNotify(ctx, cond, dot) {
		return {
			text: ctx.i18n.__(`notify.notifyAdded.${cond}`, {dot}),
			extra: {
				parse_mode: 'HTML',
				disable_web_page_preview: true,
				reply_markup:{
				inline_keyboard:[
						[
							{text: global.CRON_i18n.__('rate.buttons.notifies'), callback_data: 'notifies-0-0'},
						],
					
				
					
				]}
			}
		}			
	},

	setAddressName(ctx, _id) {
		return {
			text: ctx.i18n.__(`notify.setAddressName`),
			extra: {
				parse_mode: 'HTML',
				disable_web_page_preview: true,
				reply_markup:{
				inline_keyboard:[
						[
							{text: ctx.i18n.__('back'), callback_data: `selectAddress-${_id}-0`}
						],
					
				
					
				]}
			}
		}			
	},

	setAddressNameDone(ctx) {
		return {
			text: ctx.i18n.__(`notify.setAddressNameDone`),
			extra: {
				parse_mode: 'HTML',
				disable_web_page_preview: true,
				reply_markup:{
				inline_keyboard:[
						[
							{text: ctx.i18n.__('account.buttons.wallets'), callback_data: 'wallets-0-0'}
						],
					
				
					
				]}
			}
		}			
	},

	addPhone(ctx){
		return  {
			text: ctx.i18n.__('settings.buttons.addPhone'),
			extra: {
				parse_mode: 'HTML',
				disable_web_page_preview: true,
				reply_markup:{
				keyboard:[
					[
					
						{text: ctx.i18n.__('settings.buttons.addPhone'), request_contact: true}
				
					],
				
					
				],
				one_time_keyboard: true,
				resize_keyboard: true,
			}}
		}	
	},


	addAddress(ctx, token){
		return  {
			text: ctx.i18n.__('settings.addAddress', {id: token}),
			extra: {
				parse_mode: 'HTML',
				disable_web_page_preview: true,
				reply_markup:{
				inline_keyboard:[
					[{text: ctx.i18n.__('back'), callback_data: "wallets-0-0"}]
					
				],
	
			}}
		}	
	},

	addedPhone(ctx){
		return  {
			text: ctx.i18n.__('settings.addedPhone'),
			extra: {
				parse_mode: 'HTML',
				disable_web_page_preview: true,
				reply_markup:{	
				remove_keyboard: true,

			}}
		}	
	},

	settings(ctx) {
		let inline_keyboard = [];
		inline_keyboard.push([
			{text: ctx.i18n.__('settings.buttons.editCurrency'), callback_data: 'selectCurrency-0-0'},
			{text: ctx.i18n.__('settings.buttons.editLanguage'), callback_data: 'selectLanguage-0-0'}		
		]);
		if (!ctx.userInfo.phone) {
			inline_keyboard.push([
				{text: ctx.i18n.__('settings.buttons.addPhone'), callback_data: 'addPhone-0-0'},
			]);
		}

		inline_keyboard.push([
			{text: ctx.i18n.__('back'), callback_data: 'menu-0-0'},
		])
		return  {
			text: ctx.i18n.__('settings.main', {currency: ctx.userInfo.currency, language: langSymbol[ctx.userInfo.locale]}),
			extra: {
				parse_mode: 'HTML',
				disable_web_page_preview: true,
				reply_markup:{
				inline_keyboard
			}}
		}			
	},

	monitoring(ctx, markets) {
		let text = ctx.i18n.__('monitoring.main.empty');
		let inline_keyboard = [];
		if (markets && markets.length > 0) {
			text = ctx.i18n.__(`monitoring.main.${ctx.userInfo.target}`);
			
			markets.forEach(market => {
				let priceText = '';
				if (market.price) {
					priceText = ` · ${market.price}${curSymbol[market.currency]}`;
				}
				inline_keyboard.push([{text: `💠 ${market.sources.join(', ')} · ${market.name}${priceText}`, callback_data: `selectMarket-${market.id}-0`}]);
			});
			
			inline_keyboard.push([{text: ctx.i18n.__('monitoring.buttons.edit'), callback_data: 'editMonitoring-0-0'}]);
			
		}
		else{
			inline_keyboard.push([{text: ctx.i18n.__('monitoring.buttons.add'), callback_data: 'editMonitoring-0-0'}]);
		}

		let targetBuy = ctx.userInfo.target === 'buy' ? ` · ${ctx.i18n.__('monitoring.buttons.targetBuy')} · ` : ctx.i18n.__('monitoring.buttons.targetBuy');
		let targetSell = ctx.userInfo.target === 'sell' ? ` · ${ctx.i18n.__('monitoring.buttons.targetSell')} · ` : ctx.i18n.__('monitoring.buttons.targetSell');
		
		inline_keyboard.push([
			{text: targetBuy, callback_data: 'monitoring-buy-0'},
			{text: targetSell, callback_data: 'monitoring-sell-0'}
			]);
			

		inline_keyboard.push([{text: ctx.i18n.__('back'), callback_data: "menu-0-0"}]);

		return  {
			text: text,
			extra: {
			parse_mode: 'HTML',
			disable_web_page_preview: true,
			reply_markup:{
				inline_keyboard	
			}
		}
		}			
	},


	selectMarket(ctx, pairs) {
		let text = ctx.i18n.__(`market.main.${ctx.userInfo.target}`);
		text += '\n';

		let inline_keyboard = [];
		if (pairs) {
			pairs.forEach((pair) => {
				let pairText = `\n<b>${pair.number}.</b> ${ctx.i18n.__(`market.main.pair`, { direction:pair.direction, type: pair.type, source: pair.source})}`;
				let pairButton = `${pair.number}. ${pair.source} · ${pair.category === 'spot' ? pair.pair : pair.from}`;
				if (pair.price) {
					pairText += ` · ${pair.price}${curSymbol[pair.currency]}`
					pairButton += ` · ${pair.price}${curSymbol[pair.currency]}`
				}
				text += pairText 
				
				inline_keyboard.push([{text: pairButton, url: `${pair.url}`}]);
			});
		}
		
		
		inline_keyboard.push([{text: ctx.i18n.__('back'), callback_data: "monitoring-0-0"}]);

		return  {
			text: text,
			extra: {
			parse_mode: 'HTML',
			disable_web_page_preview: true,
			reply_markup:{
				inline_keyboard	
			}
		}
		}			
	},

	editMonitoring(ctx, markets, userMarkets) {
		let text = ctx.i18n.__(`monitoring.edit.main.${ctx.userInfo.target}`);
		let inline_keyboard = [];
		if (markets && markets.length > 0) {

			markets.forEach(market => {
				let action = 'add';
				if (Array.isArray(userMarkets) && userMarkets.find(item => String(item.id) === String(market.id))) {
					action = 'remove';
				}

				inline_keyboard.push([{text: `${market.premium ? '👑 · ' : ''}${market.sources.join(', ')} · ${market.name} · ${action === 'add' ? '🌕' : '❌'}`, callback_data: `${action}Market-${market.id}-0`}]);
			});
			
		}
	

		let targetBuy = ctx.userInfo.target === 'buy' ? ` · ${ctx.i18n.__('monitoring.buttons.targetBuy')} · ` : ctx.i18n.__('monitoring.buttons.targetBuy');
		let targetSell = ctx.userInfo.target === 'sell' ? ` · ${ctx.i18n.__('monitoring.buttons.targetSell')} · ` : ctx.i18n.__('monitoring.buttons.targetSell');
		
		inline_keyboard.push([
			{text: targetBuy, callback_data: 'editMonitoring-buy-0'},
			{text: targetSell, callback_data: 'editMonitoring-sell-0'}
			]);
			
			
		inline_keyboard.push([{text: ctx.i18n.__('back'), callback_data: "monitoring-0-0"}]);

		return  {
			text: text,
			extra: {
			parse_mode: 'HTML',
			disable_web_page_preview: true,
			reply_markup:{
				inline_keyboard	
			}
		}
		}			
	},
}