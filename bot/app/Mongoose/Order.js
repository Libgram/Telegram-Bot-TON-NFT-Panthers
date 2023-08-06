const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
	userId: {type: Schema.Types.ObjectId, required: true, ref: 'user'},
	type: {type: String, required: true}, // cryptobot and other
	month: {type: Number, required: true},
	status: {type: Number, required: true},
	data: {type: String}, // url or or or
}, {timestamps: true} );

module.exports = mongoose.model('order', orderSchema);  
