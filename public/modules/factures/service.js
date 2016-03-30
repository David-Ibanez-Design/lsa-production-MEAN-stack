angular.module('factures').factory('facturesFact', function ($resource) {

	return {

	    	list 			: $resource(
			    			'/api/factures',
							{client_id : '@client_id'},
				    	 	{'query': { method: 'GET',isArray:false }}
				    	 	),	

	    	updateStatue 	: $resource('/api/facture-updatStatue',
							{id:'@id', statue:'@statue', client_id:'@client_id'},
		    	 			{'query': { method: 'PUT' }}
		    	 			),

	}

})