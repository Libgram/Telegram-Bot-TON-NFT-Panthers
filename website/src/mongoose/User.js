const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	user_id: {type: Number, required: true, unique: true},
	username: {type: String},
	first_name: {type: String},
	last_name: {type: String},
	phone: {type: String},
	onPhone: {type: Boolean, required: true, default: false},
	locale: {type: String, required:true}, 
	panthers: {type: Boolean},
	tutorial: {type: Number, required: true},
	path: {type: String},

	messageId: {type: Number}, // active message for rates online
	
	currency: {type: String}, // show & related
	markets: [{type: Schema.Types.ObjectId, ref: 'market'}],
	target: {type: String, required: true},
	tm: {type: String},
	premium: {type: Date}, // premium
	referal: {type: Number}, // referal
}, {timestamps: true} );

module.exports = mongoose.model('user', userSchema);  
