const axios = require('../helpers/axiosHelper');

class Explorer {
	static async list () {
		try{
			let list = await axios({url:`https://api.ton.sh/getTransactions?address=${process.env.ADDRESS_1}`}, 'no proxy')
			return list.data.result
		}catch(e) {
			console.log(e);
		}
	}
}

module.exports = Explorer