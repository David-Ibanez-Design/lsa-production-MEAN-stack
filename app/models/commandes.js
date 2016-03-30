
// grab the mongoose module
var mongoose = require('mongoose')

// define our nerd model
// module.exports allows us to pass this to other files when it is called
// Load a collections from database ! mongoose put an s at hte end of collection name
module.exports = mongoose.model('commandes', 
	new mongoose.Schema({
	 produits: Array,
	 statue: String, 
	 date: String,
	 id: String,
	 num_commande: String,
	})
	, 'commandes');
