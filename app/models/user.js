// app/models/nerd.js
// grab the mongoose module
var mongoose = require('mongoose');

// define our nerd model
// module.exports allows us to pass this to other files when it is called
// Load a collections from database ! mongoose put an s at hte end of collection name
module.exports = mongoose.model('logins', 
	new mongoose.Schema({
	 id: Object,
	 utilisateur: String, 
	 mot_de_passe: String,
	 role: Array,
	})
	, 'logins');

