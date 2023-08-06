const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sourceSchema = new Schema({
	source: {type: String, required: true},
	url: {type: String, required: true},
	type: {type: String, required:true},
	/*commission:{
	input: { type: Number, required:true},
	output: { type: Number, required:true},
	extra: { type: Number }
	}*/
}, {timestamps: true} );

module.exports = mongoose.model('source', sourceSchema);  
