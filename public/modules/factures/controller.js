angular.module('factures').controller('facturesCtrl', function(facturesFact, $resource, $scope) {

	$scope.lineInvoice = {};

    facturesFact.list.query({client_id : Cookies.getJSON('globals').currentUser.id}, function(data) {
        $scope.factures = data.factures;
     });


    $scope.getInvoice = function(invoice){
    	$scope.lineOrder = invoice
    	showPopUp('invoice_details');
    }   


});