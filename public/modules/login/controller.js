angular.module('login')

.controller('LoginCtrl',['$scope', '$rootScope', '$location', 'AuthenticationService', '$window', function ($scope, $rootScope, $location, AuthenticationService, $window) {
        // reset login status
        AuthenticationService.ClearCredentials();

        $scope.logIn = function () {

            $scope.dataLoading = true;
            AuthenticationService.Login($scope.username, $scope.password, function(response) {

                if(response.success) {


                    AuthenticationService.SetCredentials($scope.username, $scope.password, $scope, response);

                    //$location.path('/dashboard');
                    $window.location.assign('/dashboard');

                } else {

                    $scope.error = "Vos identifiants sont incorrectes. Veuillez réessayer.";
                    $scope.dataLoading = false;
                }
            });
        };

         $scope.logout = function(){
         	 AuthenticationService.ClearCredentials();
         	 $location.path('/login');
         }

    }]);