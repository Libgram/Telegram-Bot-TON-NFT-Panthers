const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notifySchema = new Schema({
	userId: {type: Schema.Types.ObjectId, required: true, ref: 'user'},

	amount: {type: Number, required: true},
	cond: {type: String, required: true},
	to: [{type: String}],

	status: {type: Number, required: true}, // 0 created  // 1 work // 2 alerted
	alert_sent: {type: Date},
	
}, {timestamps: true} );

module.exports = mongoose.model('notify', notifySchema);  
