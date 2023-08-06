const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pairSchema = new Schema({
	sourceId: {type: Schema.Types.ObjectId, required: true, ref: 'source'},
	name: {type: String},
	pair: {type: String, required: true},
	category: {type: String, required: true},
	from: {type: String, required: true},
	to: {type: String, required: true}, // TONCOIN default
	currency: {type: String, required:true}, // currency price
	price: { type: Number, required: true },
	price_update: {type: Date, required: true},
	url: {type: String},
}, {timestamps: true} );

module.exports = mongoose.model('pair', pairSchema);  
