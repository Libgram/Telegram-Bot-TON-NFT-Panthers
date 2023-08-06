const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const worldSchema = new Schema({
	address: {type: String, sparse: true, unique: true, trim: true},
	username: {type: String, sparse: true, unique: true, trim: true},
	name: {type: String, required: true, unique: true},
	image: {type: String},
	search: [{type: String}],
	tags: [{type: String}],
}, {timestamps: true} );

module.exports = mongoose.model('world', worldSchema);  
