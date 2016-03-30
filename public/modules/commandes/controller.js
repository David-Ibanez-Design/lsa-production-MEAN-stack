angular.module('commandes')

.controller('commandesCtrl', function(commandesFact, $resource, $scope) {


    commandesFact.list.query({client_id : Cookies.getJSON('globals').currentUser.id}, function(data) {
         $scope.commandes = data.commandes;
         
     });

    $scope.lineOrder = {};


    $scope.getOrder = function(order){
    	$scope.lineOrder = order
    	showPopUp('order');
    }




});