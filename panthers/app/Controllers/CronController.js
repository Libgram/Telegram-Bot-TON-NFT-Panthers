const mongoose = require('mongoose');
const User = require('../Models/User')
const Address = require('../Models/Address')
const NFT = require('../Models/NFT')
const OrderNFT = require('../Models/OrderNFT');

const Explorer = require('../Models/Explorer')
const cronTemplates = require('../templates/cron');
const curSymbol = require('../helpers/templateHelper').currencies;

class CronController {
	static async payNFT() {	
		try{
			let list = await Explorer.list();		
if (!list) return;

			for (let h of list){
				try{
					let type = 'input';
		        	if (Array.isArray(h.out_msgs) && h.out_msgs.length > 0) type = 'output'; 
		        
		        	let input = type === 'output' ? h.out_msgs[0].destination : h.in_msg.source;
					let value = type === 'output' ? -h.out_msgs[0].value : h.in_msg.value;
					let message = type === 'output' ? h.out_msgs[0].message : h.in_msg.message;
					if (type !== 'input') continue
					if (message === '') continue;
					let OrderId = message;

					if (!mongoose.Types.ObjectId.isValid(OrderId)) continue;

					let currentOrderNFT = await OrderNFT.getById(OrderId);
					if (!currentOrderNFT) continue;
					if (currentOrderNFT.payed) continue; // если куплено
					if (!Array.isArray(currentOrderNFT.NFTId) || currentOrderNFT.NFTId.length <= 0) continue;
					if (value < 1000000000 * 70 * currentOrderNFT.NFTId.length) continue; // цена
					
					// 	привязываем адрес если еще не привязан
					let createAddress = await Address.create(currentOrderNFT.userId, input);
					let currentAddress = await Address.getByAddress(input);
					if (!currentAddress) continue;

					for (let NFTID of currentOrderNFT.NFTId){
						try{
							let currentUser = await User.isById(currentOrderNFT.userId);
							if (!currentUser) break;

							let getNFT = await NFT.getById(NFTID);
							if (!getNFT || getNFT.addressId) continue; // если куплено 
							
							// оплачиваем ордер
							currentOrderNFT.payed = true;
							let payedNFT = await currentOrderNFT.save();
							
							// привязываем владельца
							getNFT.addressId = currentAddress._id;
							let linkedNFT = await getNFT.save();

							if (payedNFT && linkedNFT) {
									global.CRON_i18n.setLocale(currentUser.locale);
								 	let payedNFTTemplate = cronTemplates.payedNFTTemplate(getNFT.hash);
									await global.Moon.telegram.sendMessage(currentUser.user_id, payedNFTTemplate.text, payedNFTTemplate.extra);
								
							}
						} catch(e) {
							console.log(e)
						}
					
					}
					
					


						
		
					
				} catch(e) { console.log(e) };
			}
			

		} catch(e) {
			console.log(e);
			
		}
	}


}

module.exports = CronController;
