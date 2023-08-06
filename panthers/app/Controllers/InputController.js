const User = require('../Models/User')

const templates = require('../templates');
const curSymbol = require('../helpers/templateHelper').currencies;
class InputController {
	static async addNotify({ctx, path}) {	
		try{

			if (ctx.userInfo.tutorial === -1) {
				let input = ctx.message.text.replace(',','.');
				input = Number(input);
				if (input !== input) throw {status: false, id: 1};
				let usdRate = await Currency.convert(1, 'TONCOIN','USD');
				if (!usdRate) throw new Error('#4');
				let localeRate = await Currency.convert(1, 'TONCOIN', ctx.userInfo.currency);
				if (!localeRate) throw new Error('#4');
				let cond = null;
				let localeOutput = null;
				let usdOutput = null
				
				// for percent
				if (path.type === '%') {
					if (input < -200 || input > 200) throw {status: false, id: 2, min: '-200%', max: '200%'};
					if (input < 0) {
						cond = 'm';
					}
					else{
						cond = 'b';
					}
					usdOutput = usdRate.amount * (100 + input) / 100;
				} 
				else if (path.type === 'USD') {
					let min = parseInt(usdRate.amount * 0.3 * 100) / 100;
					let max = parseInt(usdRate.amount * 3 * 100) / 100;
					if (input <= 0 || input > max || input < min) throw {status: false, id: 3, min: `${min}${curSymbol['USD']}`, max:`${max}${curSymbol['USD']}`};
					cond = input > usdRate.amount ? 'b' : 'm';
					usdOutput = input;
				} 
				else if (path.type === ctx.userInfo.currency) {
					let localeRate = await Currency.convert(1, 'TONCOIN', path.type);
					if (!localeRate) throw new Error('#4');
					
					let min = parseInt(localeRate.amount * 0.3 * 100) / 100;
					let max = parseInt(localeRate.amount * 3 * 100) / 100;
					if (input <= 0 || input > max || input < min) throw {status: false, id: 3, min: `${min}${curSymbol[localeRate.currency]}`, max:`${max}${curSymbol[localeRate.currency]}`};
					cond = input > localeRate.amount ? 'b' : 'm';
					localeOutput = input;
				}

				if (!localeOutput) {
					localeOutput = usdOutput * localeRate.amount / usdRate.amount;
				}
				if (!usdOutput) {
					usdOutput = localeOutput * usdRate.amount / localeRate.amount;
				}
				if (cond) {
					await Notify.create(ctx.userInfo._id, Math.floor10(usdOutput, -2), cond, ['telegram'])

					ctx.userInfo.path = null;
					await ctx.userInfo.save();
					
					let text = `${Math.floor10(localeOutput, -2)}${curSymbol[localeRate.currency]}`;
					if (localeRate.currency !== 'USD') text += ` (${Math.floor10(usdOutput, -2)}${curSymbol['USD']})`;
					let addedNotifyTemplate = templates.addedNotify(ctx, cond, text);
					await ctx.reply(addedNotifyTemplate.text, addedNotifyTemplate.extra);
					return;
				}

				await ctx.reply(ctx.i18n.__('errors.request'));
				
	
					
			}
			

		} catch(e) {
			console.log(e);
			if (e.status === false) {
		
				switch (e.id) {
					case 1:
				 	await ctx.reply(ctx.i18n.__('errors.onlyNumber'));
					return;
					case 2:
				 	await ctx.reply(ctx.i18n.__('errors.percentLimit', {min: e.min, max: e.max}));
					return;
					case 3:
				 	await ctx.reply(ctx.i18n.__('errors.fixLimit',{min: e.min, max: e.max}));
					return;
					case 4:
					await ctx.reply(ctx.i18n.__('errors.request'));
					return;
				}
			}
		}
	}


}

module.exports = InputController;