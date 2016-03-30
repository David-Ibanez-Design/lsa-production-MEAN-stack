angular.module('avoirs')

.controller('avoirssCtrl', function( avoirsFact, $resource, $scope) {


    avoirsFact.list.query({client_id : Cookies.getJSON('globals').currentUser.id}, function(data) {
         $scope.avoirs = data.avoirs;
     });


    $scope.getAvoir = function(avoir){
    	$scope.lineOrder = avoir
    	showPopUp('avoirs_details');
    }    

});
