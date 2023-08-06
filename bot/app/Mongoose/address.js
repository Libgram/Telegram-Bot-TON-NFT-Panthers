const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
	userId: {type: Schema.Types.ObjectId, required: true, ref: 'user'},
	address: {type: String, required: true, unique: true},
	balance: {type: Number, required: true},
	name: {type: String},
	show: {type: Boolean},
}, {timestamps: true} );

module.exports = mongoose.model('address', addressSchema);  
