angular.module('commandes')

.factory('commandesFact', function ($resource) {

      return {

		    	list 			: $resource(
		    					'/api/commandes',
								{client_id : '@client_id'},
			    	 			{'query': { method: 'GET' },isArray:false  }
			    	 			),

				create 			: $resource(
								'/api/addcommande-invoice/',
								{client_id : '@client_id'},
			    	 			{'save': { method: 'POST'}, isArray:true }
			    	 			),

		    	updateStatue 	: $resource(
		    					'/api/commande-updatStatue',
								{id:'@id', statue:'@statue', client_id:'@client_id'},
			    	 			{'query': { method: 'PUT' }}
			    	 			),

		    	getOne 	: $resource(
								'/api/get-oneOrder',
								{ numCommande:'@numCommande', client_id:'@client_id'},
			    	 			{'query': { method: 'GET' }}
			    	 			),

      }

})