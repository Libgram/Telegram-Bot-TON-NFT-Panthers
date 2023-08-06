const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NFTSchema = new Schema({
	addressId: {type: Schema.Types.ObjectId, ref: 'address'},
	hash: {type: String, required: true, unique: true},
	dna: {type: String, required: true, unique: true},
	key: {type: Number, required: true, unique: true},
	civil: {type: Number, required: true},
	attrs: [{
		name: {type: String, required: true},
		value: {type: String}
	}],
	power: {type: String},
	price: {type: Number, required: true},

}, {timestamps: true} );

module.exports = mongoose.model('NFT', NFTSchema);  