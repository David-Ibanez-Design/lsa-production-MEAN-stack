angular.module('produits')

.factory('productFact', function ($resource) {

      return {

		    	list 			: $resource(
		    					'/api/produits'
			    	 			),

				add 			: $resource(
								'/api/add-produits',
								{produit:'@produit'},
			    	 			{'query': { method: 'POST' }}
			    	 			),

				delete 			: $resource(
								'/api/del-produits/:id',
								{id:'@id'},
			    	 			{'query': { method: 'DELETE' }}
			    	 			),

				promo 			: $resource(
								'/api/produitsPromo',
								{'query': { method: 'GET' }}
			    	 			),

				addToCart 		: $resource(
								'/api/add-to-panier/',
								{id:'@id', qty:'@qty', client_id : '@client_id' },
			    	 			{'query': { method: 'POST'}}
			    	 			),
      }

})