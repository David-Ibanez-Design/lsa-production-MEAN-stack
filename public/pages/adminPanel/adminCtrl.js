Mainapp


.controller('adminCtrl', function(centre_de_notifications, commandesFact, clientsFact, productFact, facturesFact, avoirsFact, $resource, $scope) {


/////////////////// ORDER AND INVOCES /////////////////////


    //factures statue
	$scope.facturesStatue = [{facture: 'créer' },{ facture: 'En attente de payement' },{ facture: 'Payée' }];

    //order statue
	$scope.commandesStatue = [{commande: 'Validé' },{ commande: 'En préparation' },{ commande: 'En cours de livraison' },{ commande: 'Reçu' },{ commande: 'Annulée' }];

	//avoir statue
	$scope.avoirsStatue = [{avoir: 'créer' },{ avoir: 'En cours de traitement' },{ avoir: 'Paiement envoyé' },{ avoir: 'Paiement reçu' }];

	// array containing the product to creat avoir for
	$scope.prodlist = [];

    //get client object
    clientsFact.list.query(function(data) {
         $scope.clients = data;
     });

    productFact.list.query(function(data) {
         $scope.produits = data;
     });

    //update order/invoice statue
    $scope.changeStatue = function(selectedStatue, currentStatue, commande_id, client_id, documentTYpe){
	
    	if(selectedStatue != currentStatue)
    	{
    		//Update statue
    		if(documentTYpe == 'commande')
    		{

    			commandesFact.updateStatue.query({id : commande_id, statue : selectedStatue, client_id : client_id}, function(addDoc){



    				centre_de_notifications.add('Order', 'status changed', addDoc);

    			})

    		} 
    		else if (documentTYpe == 'facture')
    		{

    			facturesFact.updateStatue.query({id : commande_id, statue : selectedStatue, client_id : client_id}, function(addDoc){

    				centre_de_notifications.add('Invoice', 'status changed', addDoc);
    				
    			})

    		}
     		else if (documentTYpe == 'avoir')
    		{
    			
    			avoirsFact.updateStatue.query({id : commande_id, statue : selectedStatue, client_id : client_id}, function(addDoc){

    				centre_de_notifications.add('Avoir', 'status changed', addDoc);
    				
    			})

    		}   	

    	}
    }


	// when a cheackbox is clicked add or remove from prodList array
	$scope.stateChanged = function(prodId){
		 if (document.getElementById(prodId).checked) {
		 	$scope.prodlist.push(prodId)
		 }
		 else
		 {
		 	var index = $scope.prodlist.indexOf(prodId);
		 	$scope.prodlist.splice(index, 1);
		 }
		
	};

	// send prodListArray to the database
	$scope.getProd = function(commande_num, client_id){
		var avoir =  { num_commande: commande_num, total:0, produits : $scope.prodlist, statue : 'créer', commantaire: 'Olorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed uia non numqu am eius modi tempora incidunt ut olorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed uia non numqu am eius modi tempora incidunt ut'};
		
		avoirsFact.create.query({avoir : avoir, client_id : client_id}, function(addDoc){
			centre_de_notifications.add('Avoir', 'creation', addDoc.avoir);

		})
	}



////////////////// PRODUCTS /////////////////////

	$scope.newProd = {}

	$scope.creatProd = function(){
		productFact.add.query({produit : $scope.newProd}, function(addDoc){
			centre_de_notifications.add('Arrivage de produits', 'creation', addDoc);
		})
	}

	$scope.delProd = function(prod_id){
		productFact.delete.query({id : prod_id})
	}


});