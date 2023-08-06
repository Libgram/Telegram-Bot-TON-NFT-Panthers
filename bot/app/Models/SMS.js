const axios = require('../helpers/axiosHelper');

class SMS {
	static async send (phone, message) {
		try{
			let sendSMS = await axios({url:`https://smsc.ru/sys/send.php?login=${process.env.SMS_LOGIN}&psw=${process.env.SMS_PASSWORD}&phones=${encodeURIComponent(phone)}&mes=${encodeURIComponent(message)}`}, 'no proxy')
		}catch(e) {
			console.log(e);
		}
	}
}

module.exports = SMS