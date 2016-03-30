angular.module('panel')

.controller('TabCtrl', ['$scope', function ($scope) {

        $scope.tab = 0;

        $scope.setTab = function (tabId) {
            $scope.tab = tabId;
        };

        $scope.isSet = function (tabId) {
            return $scope.tab == tabId;
        };
    }])


