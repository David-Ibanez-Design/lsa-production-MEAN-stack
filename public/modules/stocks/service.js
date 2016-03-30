angular.module('stocks')

.factory('stocksFact', function ($resource) {

	return {

	    	list 			: $resource(
			    			'/api/stocks',
							{client_id : '@client_id'},
				    	 	{'query': { method: 'GET' ,isArray:false }}
				    	 	),	
	    	
	}

})