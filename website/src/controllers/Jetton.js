const Jetton = require('../models/Jetton')
const User = require('../models/User')
const Address = require('../models/Address')
const World = require('../models/World')
const Currency = require('../models/Currency')
const Big = require('big.js');
module.exports = {

	async getByAddress (ctx) {

		try{
			Big.strict = true
			let adr = ctx.params.address;
			let jettons = [];
			let jettonsAvailable = [
			{
				jettonAddress: 'EQBlU_tKISgpepeMFT9t3xTDeiVmo25dW_4vUOl6jId_BNIj',
				code: 'KOTE',
		        name: 'KOTECOIN',
		        username: 'KoteCoin',
		        image: 'kotecoin.png',
		        rate: '2500000'
			},
			{
				code: 'TGR',
		        name: 'TEGRO',
		        username: 'TegroMoney',
		        image: 'tgr.png',
				jettonAddress: 'EQAvDfWFG0oYX19jwNDNBBL1rKNT9XfaGP9HyTb5nb2Eml6y',
				rate: '0.1'
			}];

			let jettonsAwait = jettonsAvailable.map( async (item) => {
				let j = await Jetton.getByAddress(adr, item.jettonAddress);
				if (j && Number(j.balance) && Number(j.balance) > 0) {
					let balanceTON = new Big(j.balance).times(item.rate);
					let balanceUSD = await Currency.convert(Number(balanceTON.toString()), 'TONCOIN', 'USD');
					balanceUSD = balanceUSD && balanceUSD.amount > 0 ? String(balanceUSD.amount) : '0';
					jettons.push({
						...item, 
						balance: j.balance,
						balanceUSD: balanceUSD,
					});
				}
			
			});
			await Promise.all(jettonsAwait);
	        ctx.body = {status: true, data:{jettons}};
		}
		catch (e){
			console.log(e);
			ctx.body = {status: false};
			return;
		}
	},

  
};
