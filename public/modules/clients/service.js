angular.module('clients')


.factory('clientsFact', function ($resource) {

	return {

		    	infos 			: $resource(
		    					'/api/clientsInfos',
								{client_id : '@client_id'},
			    	 			{'query': { method: 'GET',isArray:false }}
			    	 			),

				historique 		: $resource(
								'/api/clientsHistorique',
								{client_id : '@client_id'},
			    	 			{'query': { method: 'GET',isArray:false }}
			    	 			),

		    	updateInfos 	: $resource(
		    					'/api/editClientInfos',
								{editedInfos:'@editedInfos', client_id : '@client_id'},
			    	 			{'query': { method: 'PUT' }}
			    	 			),

		    	list 			: $resource(
		    					'/api/clients',
		    					{},
    							{'query': { method: 'GET',isArray:true }}
			    	 			),

	}

})