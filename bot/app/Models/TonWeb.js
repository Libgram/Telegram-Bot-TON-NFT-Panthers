const axios = require('../helpers/axiosHelper');

class TonWeb {
	

	static async getWallet(adr){
		try{
			const wallet = await axios({url: `https://toncenter.com/api/v2/getWalletInformation?address=${adr}&api_key=${process.env.TON_API}`}, 'no proxy')
			if (wallet.data.ok) {
				return wallet.data.result;
			}
			
	
		} catch (e) {
			console.log(e);
		}
	}

	static async getTransactions(adr){
		try{
			const history = await axios({url: `https://toncenter.com/api/v2/getTransactions?address=${adr}&limit=20&api_key=${process.env.TON_API}`}, 'no proxy')
			if (history.data.ok) {
				return history.data.result;
			}
			
	
		} catch (e) {
			console.log(e);
		}
	}

}
module.exports = TonWeb;