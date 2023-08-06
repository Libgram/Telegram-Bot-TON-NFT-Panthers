const { Api, TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input"); // npm i input

class Account {

	constructor({currency, buy, apiId, apiHash, stringSession}) {
		this.messageId = null;
		this.connect = null;
		this.currency = currency;
		this.buy = buy;
		this.apiId = apiId;
		this.apiHash = apiHash;
		this.stringSession = new StringSession(stringSession);
	}


	async start() {	
		try{

			const client = new TelegramClient(this.stringSession, this.apiId, this.apiHash, {
		    	connectionRetries: 5,
			});
			await client.start({
				phoneNumber: async () => await input.text("Please enter your number: "),
				password: async () => await input.text("Please enter your password: "),
				phoneCode: async () =>
				  await input.text("Please enter the code you received: "),
				onError: (err) => console.log(err),
			});
			this.connect = client;
			return true;

		} catch(e) {
			console.log(e);
		}
	}

	async send(message) {
		try{
			let messageId = await this.connect.sendMessage('cryptobot', { message: message });
		  	if (!messageId) throw new Error('no message id');
		  	this.messageId = messageId.id + 1;
		 	return true;
		}catch(e) {
			console.log(e)
		}
	}

	async click(check, data) {
		try{
			let isMessage = await this.issetMessageText(check);
			if (!isMessage) throw new Error('!isMessage')
			await this.connect.invoke(
		    new Api.messages.GetBotCallbackAnswer({
			      peer: "@cryptobot",
			      msgId: this.messageId,
			      data: Buffer.from(data),
			    
			    })
		 	);
			
		 	return true;
		}catch(e) {
			console.log(e)
		}
	}

	issetMessageText(text) {
		return new Promise((resolve, reject) => {
			let th = this;
			let timeoutId = null;
			let updateId = null;

			timeoutId = setTimeout(() => {
				clearInterval(timeoutId);
				clearInterval(updateId);
				reject(new Error('timeout 10000ms'));
				return;
			}, 10000);

			updateId = setTimeout(async function update() {
				
				try{
					let message = await th.connect.invoke(
					    new Api.messages.GetMessages({
					      peer: "@cryptobot",
					      id:[th.messageId]
					    })
					)

					if (!Array.isArray(message?.messages) || message?.messages?.length !== 1 || !message.messages[0].message){
						 updateId = setTimeout(update, 100);
						 return;
					}
					if (message.messages[0].message.indexOf(text) !== -1) {
						clearInterval(timeoutId);
						clearInterval(updateId);
						resolve(message.messages[0]);
						return;
					}
					else{
						clearInterval(timeoutId);
						clearInterval(updateId);
						reject('no text in message');
						return;
					}
				} catch(e) {console.log(e)}
			
				
			}, 1)

		}).catch(e => console.log(e));
	}

	async getButtons(text) {
		try{
			let message = await this.issetMessageText(text);
			if (!message) return;
			if (!Array.isArray(message?.replyMarkup?.rows) || message?.replyMarkup?.rows?.length <= 0) return;
			let rows = message?.replyMarkup?.rows;
			let buttons = [];
			rows.forEach(row => {
				if (!Array.isArray(row?.buttons) || row?.buttons?.length <= 0) return;
				row.buttons.forEach(column => {
					let data = Buffer.from(column.data).toString("utf8");
					if (column?.text === '‹ Назад') return;
					if (data.indexOf('payment-methods-page') !== -1) return;
					buttons.push(column.text + ' · ' + data);
				});
			})

			return buttons;
			
		 	return true;
		}catch(e) {
			console.log(e)
		}
		
	}


}

module.exports = Account;