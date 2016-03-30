
// grab the mongoose module
var mongoose = require('mongoose')



// define our nerd model
// module.exports allows us to pass this to other files when it is called
// Load a collections from database ! mongoose put an s at hte end of collection name
module.exports = mongoose.model('clients', 
	new mongoose.Schema({
	 id: String,
	 nom: String, 
	 tel: String,
	 fax: String,
	 tva: String,
	 adresse_fac: String, 
	 BU: String,
	 commercial: String, 
	 code_fac: String,
	 ville_fac: String,
	 ville: String,
	 adresse_livraison: String,
	 email: String, 
	 nom_gerent: String,
	 tel_gerent: String,
	 forme_juridique: String,
	 ville_livraison: String, 
	 registre: String,
	 fiscale: String, 
	 art_import: String,
	 remise: String,
	 convention_annuelle: String,
	 benefice_annuelle: String,
 	 avoirs: [{
		 produits: Array,
		 statue: String, 
		 total: Number,
		 date: {type: Date, default: Date.now},
		 id: String,
		 num_commande: String,
	 }],
	 factures: [{
	 	 num_commande: String,
	 	 date: {type: Date, default: Date.now},
		 produits: [{ 
			 id: String,
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
			 qty_panier: Number
		}],
		 statue: String, 
		 priorite: String,
		 total: Number,
		 commantaire: String,
	 }],

	 notifications: [{
	 	 categorie: String,
		 nom: String, 
		 date: {type: Date, default: Date.now}, 
		 message: String, 
		 img: String, 
		 priorite: String,
		 num_commande: String,
	 }], 

	 commandes: [{
		 produits: [{
			 id: String,
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
		 statue: String, 
		 total: Number,
		 date: {type: Date, default: Date.now},
		 id: String,
		 // generate ramdom order number
		 num_commande: String,

	 }],

	 stock: Array, 

})
, 'clients');

