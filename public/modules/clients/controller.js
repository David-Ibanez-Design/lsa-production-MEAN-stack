angular.module('clients')


.controller('clientsCtrl', function(clientsFact, $resource, $scope) {

    $scope.listHistoriques = []; 

    clientsFact.historique.query({client_id : Cookies.getJSON('globals').currentUser.id}, function(data) {

        var list = data;


            for (var key in list) {
              if (list.hasOwnProperty(key)) 
              {
                
                for (var i = 0; i < list[key].length; i++) {

                   list[key][i].cat = key;
                    
                   $scope.listHistoriques.push(list[key][i])
                  
                  
                }
         
              }
            }
         
           angular.forEach(data, function(data) {
                
        })

     });

     $scope.getHistorique = function(histo){
    	$scope.lineOrder = histo
    	showPopUp('historique_details');
    }

    clientsFact.infos.query({client_id : Cookies.getJSON('globals').currentUser.id}, function(data) {
    	$scope.clientsInfos = data
    })


	$scope.updateClient = function(editedInfos){

	    clientsFact.updateInfos.query({editedInfos:editedInfos, client_id : Cookies.getJSON('globals').currentUser.id}, function(data) {
    		$scope.clientsInfos = data
    	})	

	}

    $scope.sortType     = 'cat'; // set the default sort type
  	$scope.sortReverse  = false;  // set the default sort order
  	$scope.searchFish   = '';     // set the default search/filter term

});