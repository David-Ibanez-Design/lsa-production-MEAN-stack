// app/models/nerd.js
// grab the mongoose module
var mongoose = require('mongoose')

// define our nerd model
// module.exports allows us to pass this to other files when it is called
// Load a collections from database ! mongoose put an s at hte end of collection name
module.exports = mongoose.model('produits', 
	new mongoose.Schema({
	 id: Object,
	 nom: String, 
	 dosage: String,
	 prescription: String,
	 principe_actif: String,
	 forme: String,
	 forme_img: String, 
	 qty: Number,
	 ref: Number,
	 prix: Number,
	 promo: Number,
	 photo: String,
	 qty_panier: Number,
	 date: {type: Date, default: Date.now},
	})
	, 'produits');

