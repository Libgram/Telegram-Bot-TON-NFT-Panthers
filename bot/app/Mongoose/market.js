const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const marketSchema = new Schema({
  name: {type: String, required: true}, // human name 
  currencies: [String], // доступные валюты для юзера
  pairs:[{type: Schema.Types.ObjectId, ref: 'pair', required: true}],
  target: {type: String, required: true},
  premium: {type: Boolean, required: true},
}, {timestamps: true} );

module.exports = mongoose.model('market', marketSchema);  
