const TonWeb = require('tonweb');
const Address = TonWeb.utils.Address;
const NftUtils = require("tonweb/src/contract/token/nft/NftUtils");
const utils = TonWeb.utils;
const Cell = TonWeb.boc.Cell;
const { JettonMinter, JettonWallet } = TonWeb.token.jetton;

class Jetton {
	
	static async getByAddress(walletAddress, jettonAddress){
		try{
			const tonweb = new TonWeb(new TonWeb.HttpProvider('https://toncenter.com/api/v2/jsonRPC', { apiKey: process.env.TON_API }));

			if (!TonWeb.Address.isValid(walletAddress)) throw new Error('invalid address')
		    const userWallet = new Address(walletAddress);
		    const cell = new Cell();
		    const minterAddress = new Address(jettonAddress);
		    cell.bits.writeAddress(userWallet);
	        const result = await tonweb.provider.call2(minterAddress.toString(), 'get_wallet_address', [['tvm.Slice', (0, utils.bytesToBase64)(await cell.toBoc(false))]]);
	        const address = (0, NftUtils.parseAddress)(result);

	        const JW = new JettonWallet(tonweb.provider, {
	            address
	        });

	        const balance = (await JW.getData()).balance.toString();

	        return { walletAddress: walletAddress, jettonAddress: address.toString(true, true, true), balance: TonWeb.utils.fromNano(balance)};

		 
	
		} catch (e) {
			//console.log(e);
			
		}
	}

}
module.exports = Jetton;