class Currency {

	static async convert(oldAmount, oldCurrency, newCurrency){
		try{
			oldAmount = Number(oldAmount);
			if (!oldAmount) throw new Error(`incorect oldAmount`);

			oldCurrency = oldCurrency.toUpperCase();
			newCurrency = newCurrency.toUpperCase();

			let oldCurrencyRate = await global.Redis.get(`currency-${oldCurrency}`);
			oldCurrencyRate = Number(oldCurrencyRate);
			if (!oldCurrencyRate) throw new Error(`incorrect oldCurrencyRate ${oldCurrencyRate}`);

			let newCurrencyRate = await global.Redis.get(`currency-${newCurrency}`);
			newCurrencyRate = Number(newCurrencyRate);
			if (!newCurrencyRate) throw new Error(`incorrect newCurrencyRate ${newCurrencyRate}`);

			let newAmount = oldAmount * newCurrencyRate / oldCurrencyRate;
			if (!newAmount) throw new Error(`incorrect newAmount ${newAmount}`);
			return {
				amountF: Math.floor10(newAmount, -2),
				amount: parseInt(newAmount * 10000000)/10000000,
				currency: newCurrency,
			}
		} catch (e) {
			console.log(e);
			return{
				amountF: Math.floor10(oldAmount, -2),
				amount: parseInt(oldAmount * 10000000)/10000000 || 0, 
				currency: oldCurrency
			}
		}
	}

	static async get(cur){
		try{
			
			let currency = await global.Redis.get(`currency-${cur}`);
			if (!currency) throw new Error('no info currency');
			let expire = await global.Redis.ttl(`currency-${cur}`);
			//expire = process.env.OLD_CURRENCY - 
			
			return {
				date_update: expire,
				price: Number(currency),
			}
		} catch (e) {
			console.log(e);
			return;
		}
	}


}
module.exports = Currency;