angular.module('menu')

.controller('menuCtrl', function ($scope, $location) {

      $scope.isActive = function (viewLocation) { 

            return viewLocation === $location.path();
        };

});