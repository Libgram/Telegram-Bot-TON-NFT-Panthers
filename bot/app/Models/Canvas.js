const sharp = require('sharp');
const fs = require('fs');
const path = require("path");
const Currency = require('../Models/Currency')
const curSymbol = require('../helpers/templateHelper').currencies;
const langSymbol = require('../helpers/templateHelper').flags;
class Canvas {

	static async rate({userId, currency, usdRate, localeRate}){
		try{
			let infoCoin = await global.Redis.get(`info`);
			infoCoin = JSON.parse(infoCoin);
			if (!infoCoin) return;
			infoCoin = Math.floor10(infoCoin.market_data.price_change_percentage_24h, -2);
			let chart = await global.Redis.get(`chart`);
			if (!chart) return;

			let textRate = `${localeRate.amountF} ${localeRate.currency}`;
			if (currency !== 'USD') {
				textRate += ` (${usdRate.amountF} ${usdRate.currency})`
			}
			if (!usdRate || !localeRate) return;
			chart = 'data:image/png;base64,'+chart;
			let svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 600 400"><defs><style>.cls-1,.cls-2{fill:#08c;}.cls-2{stroke:#fff;stroke-miterlimit:10;}.cls-3,.cls-4,.cls-5{fill:#fff;}.cls-4{fill-rule:evenodd;}.cls-5{font-size:17.05px;font-family:Gilroy-UltraLight, Gilroy;font-weight:100;}.cls-6{letter-spacing:-0.09em;}.cls-7{letter-spacing:-0.01em;}.cls-8{font-size:16px;fill:#fcfcfc;font-family:Gilroy-Regular, Gilroy;}.cls-9{letter-spacing:-0.04em;}.cls-10{letter-spacing:-0.02em;}.cls-11{letter-spacing:-0.02em;}.cls-12{letter-spacing:-0.03em;}.cls-13{letter-spacing:0em;}.cls-14{letter-spacing:-0.01em;}.cls-15{letter-spacing:-0.04em;}.cls-16{letter-spacing:0em;}</style></defs><title>Ресурс 4</title><g id="Слой_2" data-name="Слой 2"><g id="Слой_1-2" data-name="Слой 1"><rect class="cls-1" width="600" height="400"/><rect class="cls-2" x="25" y="25" width="550" height="350" rx="16.31"/><image width="600" height="300" transform="translate(48.5 131.5) scale(0.83 0.67)" xlink:href="${chart}"/><path class="cls-3" d="M439.6,352.41A12,12,0,0,1,430,333.19,12,12,0,1,0,446.81,350,12,12,0,0,1,439.6,352.41Z"/><circle class="cls-2" cx="80" cy="80" r="28"/><path class="cls-4" d="M72.54,70.5H88a3.78,3.78,0,0,1,1.67.35A3.25,3.25,0,0,1,90.94,72l0,.09a3.45,3.45,0,0,1,.45,1.72A3.74,3.74,0,0,1,91,75.64h0L81.23,92.41a1.22,1.22,0,0,1-1,.59,1.18,1.18,0,0,1-1-.6L69.58,75.68h0A3.7,3.7,0,0,1,69,74a3.16,3.16,0,0,1,.43-1.9,3.2,3.2,0,0,1,1.43-1.32A4,4,0,0,1,72.54,70.5ZM79,72.9H72.54a1.56,1.56,0,0,0-.7.08.84.84,0,0,0-.38.34.92.92,0,0,0-.12.51,1.57,1.57,0,0,0,.3.62v0L79,87.31Zm2.39,0V87.37l7.52-12.91a1.41,1.41,0,0,0,.14-.61,1.16,1.16,0,0,0-.12-.51l-.19-.24a.32.32,0,0,0-.12-.08A1.45,1.45,0,0,0,88,72.9Z"/><text class="cls-5" transform="translate(451 349.95)">TonMoonBot</text>
			<text class="cls-8" transform="translate(128.63 74.25)">1 TON = ${textRate}</text>
			<text class="cls-8" transform="translate(128.63 99.25)">${infoCoin}% · 24h</text>
</g></g></svg>`;
			
			let outputBuffer = await sharp(Buffer.from(svg))
			  .png()
			  .toBuffer()


			return Buffer.from(outputBuffer, 'base64')
		} catch (e) {
			console.log(e);
			
		}
	}

	static async account({premium, currency, name, nft}){
		try{
			let infoCoin = await global.Redis.get(`info`);
			infoCoin = JSON.parse(infoCoin);
			if (!infoCoin) return;
			infoCoin = Math.floor10(infoCoin.market_data.price_change_percentage_24h, -2);
			let chart = await global.Redis.get(`chart`);
			if (!chart) return;
			let usdRate = await Currency.convert(1, 'TONCOIN','USD');
			let localeRate = await Currency.convert(1, 'TONCOIN', currency);
			let textRate = `${localeRate.amountF} ${localeRate.currency}`;
			if (currency !== 'USD') {
				textRate += ` (${usdRate.amountF} ${usdRate.currency})`
			}
			if (!usdRate || !localeRate) return;
			chart = 'data:image/png;base64,'+chart;
			let svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 600 400"><defs><style>.cls-13 {opacity: 0.2;fill: #fff;}.cls-14 {font-size: 12px;font-family: Gilroy-Regular, Gilroy;fill: #fff;}.cls-1,.cls-2{fill:#08c;}.cls-2{stroke:#fff;stroke-miterlimit:10;}.cls-3,.cls-4,.cls-5{fill:#fff;}.cls-4{fill-rule:evenodd;}.cls-5{font-size:17.05px;font-family:Gilroy-UltraLight, Gilroy;font-weight:100;}.cls-6{letter-spacing:-0.09em;}.cls-7{letter-spacing:-0.01em;}.cls-8{font-size:16px;fill:#fcfcfc;font-family:Gilroy-Regular, Gilroy;}.cls-9{letter-spacing:-0.04em;}.cls-10{letter-spacing:-0.02em;}.cls-11{letter-spacing:-0.02em;}.cls-12{letter-spacing:-0.03em;}.cls-13{letter-spacing:0em;}.cls-14{letter-spacing:-0.01em;}.cls-15{letter-spacing:-0.04em;}.cls-16{letter-spacing:0em;}</style></defs><title>Ресурс 4</title><g id="Слой_2" data-name="Слой 2"><g id="Слой_1-2" data-name="Слой 1"><rect class="cls-1" width="600" height="400"/><rect class="cls-2" x="25" y="25" width="550" height="350" rx="16.31"/><image width="600" height="300" transform="translate(48.5 131.5) scale(0.83 0.67)" xlink:href="${chart}"/><path class="cls-3" d="M439.6,352.41A12,12,0,0,1,430,333.19,12,12,0,1,0,446.81,350,12,12,0,0,1,439.6,352.41Z"/><circle class="cls-2" cx="80" cy="80" r="28"/><text class="cls-5" transform="translate(451 349.95)">TonMoonBot</text>
			<path xmlns="http://www.w3.org/2000/svg" class="cls-13" d="M72.36,63.11a28.18,28.18,0,0,1,.7-10.54C56.41,56.92,45.79,76.2,56.41,95.25a21,21,0,0,0,8.14,8.15c19.06,10.62,38.34,0,42.69-16.65A28,28,0,0,1,72.36,63.11Z"/>
			<text xmlns="http://www.w3.org/2000/svg" class="cls-14" transform="translate(58.15 85.68)">${nft ? `${nft} NFT` : 'NO NFT'}</text>
			<text class="cls-8" transform="translate(128.63 74.25)">${name} ${premium ? ' · Premium': ''}</text>
			<text class="cls-8" transform="translate(128.63 99.25)">${usdRate.amountF} ${usdRate.currency} · ${infoCoin}% · 24h</text>
</g></g></svg>`;
			
			let outputBuffer = await sharp(Buffer.from(svg))
			  .png()
			  .toBuffer()


			return Buffer.from(outputBuffer, 'base64')
		} catch (e) {
			console.log(e);
			
		}
	}




}
module.exports = Canvas;