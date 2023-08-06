const User = require('../models/User')
const Address = require('../models/Address')
const World = require('../models/World')
const TonWeb = require('../models/TonWeb');
const Currency = require('../models/Currency')
module.exports = {

	async get (ctx) {
		try{
			
			let adr = ctx.params.address;
			if (adr.length !== 48) throw new Error('no valide address')
			const history = await TonWeb.getTransactions(adr);


			const data = await TonWeb.getWallet(adr);
			if (!data) throw new Error('no valide address info')
			
			let balance = 0;
			let localeBalance = null;
			if (data && Number(data.balance) >= 0) {
				balance = Number(data.balance);
				if (balance > 0) {
				
					localeBalance = await Currency.convert(balance / 1000000000, 'TONCOIN', 'USD');
				}
			}
			let currentAddress = await Address.get(adr);
			let name = null;
			let image = null;
			let username = null;
			let tags = [];
			if (!currentAddress) {
				let currentWorld = await World.create(adr);
				name = currentWorld.name || null;
				image = currentWorld.image || null;
				username = currentWorld.username || null;
				tags = currentWorld.tags || [];
			}
			let historyArray = [];

			let adrAll = [];
			let adrKnow = [];
			let adrWorld = [];
			if (history) {
				for(let h of history) {
					let type = 'input';
		        	if (Array.isArray(h.out_msgs) && h.out_msgs.length > 0) type = 'output'; 
		        
		        	let input = type === 'output' ? h.out_msgs[0].destination : h.in_msg.source;
					let value = type === 'output' ? -h.out_msgs[0].value : h.in_msg.value;
					let message = type === 'output' ? h.out_msgs[0].message : h.in_msg.message;

					adrAll.push(input);

					historyArray.push({
						info: null,
						date: h.utime * 1000,
			        	p: input,
			       		fee: h.fee,
			       		transaction_id: h.transaction_id,
			        	value: value,
			        	message: message});
				}
			}

			adrAll = [...new Set(adrAll)];
			
			let knowAddresses = await Address.getAddresses(adrAll);
			if (knowAddresses) {
				for (let hist of historyArray){
					let ka = knowAddresses.find(adr => {return adr.address === hist.p});
					if (ka) {
						adrKnow.push(ka.address);
						hist.info = {name: ka?.userId?.first_name, is_user: true, username: ka?.userId?.username};
					}
				}
			}

			for(let aa of adrAll){
				let ka = adrKnow.find(ak => {return aa === ak});
				if (!ka) adrWorld.push(aa);
			}
	
	
			let worldAddresses = await World.creates(adrWorld);
			if (worldAddresses) {
				for(let hist of historyArray){
					if (!hist.info && worldAddresses[hist.p]) {
						hist.info = {image: worldAddresses[hist.p].image, name: worldAddresses[hist.p].name, is_user: false, username: null};
					}
				}
			}

	        ctx.body = {status: true, data:{tags, username, image: image, address: adr, balance: data?.balance, localeBalance: localeBalance, name, user_id: currentAddress?.userId?.user_id || null, history: historyArray}};
		}
		catch (e){
			console.log(e);
			ctx.body = {status: false};
			return;
		}
	},

	async getHistory (ctx) {
		try{
			let adr = ctx.request.body.adr;
			let lt = ctx.request.body.lt;
			let hash = ctx.request.body.hash;
			if (adr.length !== 48) throw new Error('no valide address')
			if (!adr || !lt || !hash) throw new Error('no params');
			const history = await TonWeb.getTransactions(adr, 50, lt,hash);
			if (!history) throw new Error('no history')
			let historyArray = [];

			let adrAll = [];
			let adrKnow = [];
			let adrWorld = [];
			let brk = true;
			if (history) {
				for(let h of history) {
					if (brk) {brk = false; continue;}
					let type = 'input';
		        	if (Array.isArray(h.out_msgs) && h.out_msgs.length > 0) type = 'output'; 
		        
		        	let input = type === 'output' ? h.out_msgs[0].destination : h.in_msg.source;
					let value = type === 'output' ? -h.out_msgs[0].value : h.in_msg.value;
					let message = type === 'output' ? h.out_msgs[0].message : h.in_msg.message;

					adrAll.push(input);

					historyArray.push({
						info: null,
						date: h.utime * 1000,
			        	p: input,
			       		fee: h.fee,
			       		transaction_id: h.transaction_id,
			        	value: value,
			        	message: message});
				}
			}

			adrAll = [...new Set(adrAll)];
			
			let knowAddresses = await Address.getAddresses(adrAll);
			if (knowAddresses) {
				for (let hist of historyArray){
					let ka = knowAddresses.find(adr => {return adr.address === hist.p});
					if (ka) {
						adrKnow.push(ka.address);
						hist.info = {name: ka?.userId?.first_name, is_user: true, username: ka?.userId?.username};
					}
				}
			}

			for(let aa of adrAll){
				let ka = adrKnow.find(ak => {return aa === ak});
				if (!ka) adrWorld.push(aa);
			}
	
	
			let worldAddresses = await World.creates(adrWorld);
			if (worldAddresses) {
				for(let hist of historyArray){
					if (!hist.info && worldAddresses[hist.p]) {
						hist.info = {image: worldAddresses[hist.p].image, name: worldAddresses[hist.p].name, is_user: false, username: null};
					}
				}
			}

	        ctx.body = {status: true, data:{address: adr, history: historyArray}};
		}
		catch (e){
			console.log(e);
			ctx.body = {status: false};
			return;
		}
	},
  
};
