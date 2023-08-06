const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderNFTSchema = new Schema({
	userId: {type: Schema.Types.ObjectId, required: true, ref: 'user'},
	NFTId: [{type: Schema.Types.ObjectId, required: true, ref: 'NFT'}],
	payed: {type: Boolean, required: true}
}, {timestamps: true} );

module.exports = mongoose.model('orderNFT', orderNFTSchema);  
