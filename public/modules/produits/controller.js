angular.module('produits')

.controller('produitsCtrl' , function(cartService, productFact, $resource, $scope) {

    //display products
    productFact.list.query({}, function(data) {
        $scope.produits = data;  
     })

    // get promotions
    productFact.promo.query(function(data) {
        $scope.promos = data;
     });

    // add product from list  
    $scope.addItem = cartService.add;

});