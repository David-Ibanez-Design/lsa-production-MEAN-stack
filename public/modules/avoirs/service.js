angular.module('avoirs')

.factory('avoirsFact', function ($resource) {

	return {

	    	list 			: $resource(
			    			'/api/avoirs',
							{client_id : '@client_id'},
				    	 	{'query': { method: 'GET',isArray:false }}
				    	 	),	

	    	updateStatue 	: $resource('/api/avoir-updatStatue',
							{id:'@id', statue:'@statue', client_id:'@client_id'},
				 			{'query': { method: 'PUT' }}
				 			), 

	    	create 			: $resource('/api/creatAvoir',
							{avoir:'@avoir', client_id:'@client_id'},
				 			{'query': { method: 'POST' }}
				 			),
	}

})