const curSymbol = require('../helpers/templateHelper').currencies;
const langSymbol = require('../helpers/templateHelper').flags;
module.exports = {

	payedNFTTemplate(hash) {
	
		return {
			text: global.CRON_i18n.__(`payedNFT`, {
				hash: hash
			}),
			extra: {
				parse_mode: 'HTML',
				disable_web_page_preview: true,
			}
		}			
	},
}