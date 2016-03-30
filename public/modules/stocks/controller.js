angular.module('stocks')

.controller('stocksCtrl', function(stocksFact, $resource, $scope) {

    stocksFact.list.query({client_id : Cookies.getJSON('globals').currentUser.id}, function(data) {
        $scope.stocks = data.list;
     });



});