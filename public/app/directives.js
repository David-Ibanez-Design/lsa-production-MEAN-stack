


angular.module('MainApp')


.directive('clock', function($timeout, dateFilter){
    return function(scope, element, attrs){
       var timeoutId; // timeoutId, so that we can cancel the time updates
 
      // schedule update in one second
      function updateLater() {
        // save the timeoutId for canceling
        timeoutId = $timeout(function() {
          element.text(dateFilter(new Date(), 'HH:mm:ss '));
          updateLater(); // schedule another update
        }, 1000);
      }
        
      // listen on DOM destroy (removal) event, and cancel the next UI update
      // to prevent updating time ofter the DOM element was removed.
      element.bind('$destroy', function() {
        $timeout.cancel(timeoutId);
      });
 
      updateLater(); // kick off the UI update process.
    }
})



.directive('initElems', function() {

    return function(scope, element, attrs) {

        angular.element(document).ready(function() {
    
            // Order results
            initElems();
        });


    };

})


.directive('jsModules', function() {

    return function(scope, element, attrs) {

        angular.element(document).ready(function() {
        
            // Order results
            orderRslt();

            // init scollbar | width size
            scollbar();
        });


    };

})

.directive('jsPanier', function() {

    return function(scope, element, attrs) {

        angular.element(document).ready(function() {
        
            // btn qty panier
            btnModifQte();

        });


    };

})

.directive('graph', function() {

    return function(scope, element, attrs) {

        angular.element(document).ready(function() {

            // inti graph
			if($('.myChart').length){graphInit();}

        });




    };

})

.directive('googleMap', function() {

    return function(scope, element, attrs) {

        angular.element(document).ready(function() {
        	
            //init google map
			Map();

        });


    };

})

.directive('contact', function() {

    return function(scope, element, attrs) {

        angular.element(document).ready(function() {

            // init contact form
            initConatcForm();

        });


    };

})




.directive('editClient', function() {

    return function(scope, element, attrs) {

        angular.element(document).ready(function() {

            // Fiche client edit
			editFicheClient();

        });


    };

})


.directive('posStatue', function() {


  return {

    restrict: 'A',




    link: function(scope, iElement) {

    	scope.nbStatue = '';
    	scope.pos = 0;

    	if(scope.commande)
    	{

    		scope.nbStatue = 5


                switch(scope.commande.statue) {

                    case 'Validée':

                        scope.pos = 1;

                        break;

                    case 'En préparation':

						scope.pos = 2;

                        break;

                    case 'En cours de livraison':

						scope.pos = 3;

                        break;

                    case 'Reçu':

						scope.pos = 4;

                        break;

                    case 'annulée':

						scope.pos = 5;

                        break;                        
               	}

    	}
    	else if (scope.avoirs)
    	{

    		scope.nbStatue = 4

                switch(scope.commande.statue) {

                    case 'Créer':

                        scope.pos = 1;

                        break;

                    case 'En cours de traitement':

						scope.pos = 2;

                        break;

                    case 'Paiement envoyé':

						scope.pos = 3;

                        break;

                    case 'Paiement reçu':

						scope.pos = 4;

                        break;
                       
               	}

    	}


    	scope.placement = (100/scope.nbStatue)*scope.pos+'%';
    	
      
    },

    template: '<div class="tab-indicateurStatus" style="left:{{placement}}" ></div>',

  }


});