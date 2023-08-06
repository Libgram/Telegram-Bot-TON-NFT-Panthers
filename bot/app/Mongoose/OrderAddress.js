const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderAddressSchema = new Schema({
	userId: {type: Schema.Types.ObjectId, required: true, ref: 'user'},
	payed: {type: Boolean, required: true}
}, {timestamps: true} );

module.exports = mongoose.model('orderAddress', orderAddressSchema);  
