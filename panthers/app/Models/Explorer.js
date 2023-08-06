const axios = require('../helpers/axiosHelper');

class Explorer {
	static async list () {
		try{
			const history = await axios({url: `https://toncenter.com/api/v2/getTransactions?address=EQAV6CC-TKig7a8pQaKJbZVLySSG73V-sRmtcIbelBCHVaUL&limit=20&api_key=8453e7bf535288918d044be5358104ecfb2b066279b3e5fb5c5706703b279523`}, 'no proxy')
			if (history.data.ok) {
				return history.data.result;
			}
			
	
		} catch (e) {
			console.log(e);
		}
	}
}

module.exports = Explorer