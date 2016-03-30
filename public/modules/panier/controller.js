angular.module('panier')

// display products in cart 
.controller('panierCtrl', function(centre_de_notifications, cartService, panierFact, commandesFact , $scope) {


	// retreve list of product in cart from database
	$scope.productsPanier = cartService.getList();
	// delet product from cart 
	$scope.removeProd = cartService.delProd;


	// update database qty on change yhem update total
	$scope.qtyUpdate = function(id, qty){	
		 panierFact.update.query({id : id, qty : qty, client_id : Cookies.getJSON('globals').currentUser.id})
		 $scope.totalPanier();
	}

	// total calculation handeling
	$scope.totalPanier = function(){
	       	var total = 0;
	        angular.forEach($scope.productsPanier, function(productPanier) {
	            total += productPanier.qty_panier * productPanier.prix;
	        })

	        return total;
	}



	$scope.validationPanier = function (){


	// spwan new order (frist) : to be displayed can be cancel (provide link to inivoice) but unitl
		// a certain statue has been reach
		// statue : Validée - En préparation - En cours de livraison - Reçu - annulée
		// can be modify that will create an avoir on the selected product 
	var total = $scope.totalPanier();
	var order = { num_commande: '' , statue : 'Validé', total:total};
	var invoice = { num_commande: '', statue : 'En attente de payement', priorite : 'Haute', total:total, commantaire: 'Olorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed uia non numqu am eius modi tempora incidunt ut olorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed uia non numqu am eius modi tempora incidunt ut'};
	var produits = [];

	
	// push product to the produits array 
    for(var i = 0; i < $scope.productsPanier.length; i++) {
    	produits.push($scope.productsPanier[i])
    };

    order['produits'] = produits;
    invoice['produits'] = produits;

    // insert new order and invoice to database
    commandesFact.create.save({order:order , invoice: invoice, client_id : Cookies.getJSON('globals').currentUser.id}, function(docAdded){

    		centre_de_notifications.add('Order', 'created', docAdded.order);

    		centre_de_notifications.add('Invoice', 'created', docAdded.invoice);

    });



		// spwan notification (last to be implemented with a specfic service/factory call notificationCenter):
			// center de notification when an action happend ex: order is made -> creat a sale order and a invoice
			// avoir is created -> creat an avoir notification, order is cancel -> notification 
		

	}


});