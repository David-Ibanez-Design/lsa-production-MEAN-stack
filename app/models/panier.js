
// grab the mongoose module
var mongoose = require('mongoose').set('debug', true);

// define our nerd model
// module.exports allows us to pass this to other files when it is called
// Load a collections from database ! mongoose put an s at hte end of collection name
module.exports = mongoose.model('panier', 
	new mongoose.Schema({
	 id: Object,
	 client_id: String, 
	 statue: String, 
	 produits:  [{
			 id: Object,
			 nom: String, 
			 dosage: String,
			 prescription: String,
			 principe_actif: String,
			 forme: String,
			 form_img: String, 
			 qty: Number,
			 ref: Number,
			 prix: Number,
			 promo: Number,
			 photo: String,
			 qty_panier: Number,
		 }],

	})
	, 'panier');

