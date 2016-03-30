angular.module('notifications')


.controller('notificationsCtrl', function(centre_de_notifications, commandesFact, $resource, $scope) {

    $scope.notifications = centre_de_notifications.getList();

    $scope.lineOrder = {};

    $scope.openElement = function(notif){
    	
    	commandesFact.getOne.query({numCommande:notif.num_commande ,client_id : Cookies.getJSON('globals').currentUser.id}, function(onOrder) {
    		
         	$scope.lineOrder = onOrder;
        	showPopUp('order_notif');
     	});

    	
    	
    }


})


