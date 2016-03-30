angular.module('panier')

.factory('panierFact', function ($resource) {

      return {

		    	list 			: $resource(
		    					'/api/display-panier',
			    	 			{'query': { method: 'GET'}, isArray:true}
			    	 			),

				delete 			: $resource(
								'/api/remove-from-panier/:id',
								{id:'@id', client_id : '@client_id'},
			    	 			{'query': { method: 'DELETE'}}
			    	 			),

				update 			: $resource(
								'/api/changeQty-from-panier/',
								{id:'@id', qty:'@qty',  client_id : '@client_id'},
			    	 			{'query': { method: 'PUT'}}
			    	 			),				

      }

})



// update cart when added
.service('cartService',function(panierFact, productFact){

	
	var list = [];
	init()


	function init(){
		list = panierFact.list.query({client_id : Cookies.getJSON('globals').currentUser.id})
	}


    var getList = function(){
		return list;
    };


    var getListCount = function(){
		return list.length;
    };


    var add = function(id, qty, stock){

    	var alreadyAdded = false;

    	// cheach id the id is aleady in the array
    	for(var i = 0 ; i < list.length; i++){
		    if(list[i].hasOwnProperty("_id") && list[i]._id === id) {
		      alreadyAdded = true;
		    }
		} 

    	// error handeling
    	if(qty == 0)
    	{
    		alert('minimum 1 prduits');

    	}else if(qty>stock){

    		alert('il n\'y a que'+stock+' produts en stock' );
    	}
    	else if (alreadyAdded){
    		alert('ce produit est déjà dans le panier' );
    	}
    	else{

			productFact.addToCart.query({id : id, qty : qty, client_id : Cookies.getJSON('globals').currentUser.id}, function(data){
	    		 list.push(data.addedProd);
	    	})
    	}

    };


    var delProd = function(id, index){
		
    	panierFact.delete.query({id : id, client_id : Cookies.getJSON('globals').currentUser.id}, function(data){
    		list.splice(index, 1);
    	})
    }

    return{
        getList: getList,
        add: add,
        delProd: delProd,
        getListCount: getListCount

    };
})
  