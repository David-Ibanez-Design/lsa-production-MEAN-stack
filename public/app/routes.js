angular.module('MainApp')

.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

 // the common part to every pages (header) is load on server side and all the rest are served as partial to be load inside


        $stateProvider

              // defualt route when acessing the web site  
              .state('/', 
                {
                    url :'/dashboard',
                    templateUrl: 'pages/dashboard.html',
                    parent: 'menu',

               })

             // commm part to be load on every pages
             .state('menu', {
                templateUrl: 'modules/menu/view/menu.html',
                abstract: true,
              })

    		 .state('login', 
                {
                    url :'/login',
    	            templateUrl: 'modules/login/views/login.html',
                    controller:'LoginCtrl'
    	       })

		            .state('adminPanel-menu', 
		                {
		                    templateUrl: 'pages/adminPanel/menu.html',
		                    abstract: true,
		               })

		            .state('produits', 
		                {
		                    url :'/produits',
		                    parent: 'adminPanel-menu',
		                    templateUrl: 'pages/adminPanel/produits.html',
		               })

		            .state('commandes', 
		                {
		                    url :'/commandes',
		                    parent: 'adminPanel-menu',
		                    templateUrl: 'pages/adminPanel/commandes.html',
		               })

		            .state('factures', 
		                {
		                    url :'/factures',
		                    parent: 'adminPanel-menu',
		                    templateUrl: 'pages/adminPanel/factures.html',
		               })

		            .state('avoirs', 
		                {
		                    url :'/avoirs',
		                    parent: 'adminPanel-menu',
		                    templateUrl: 'pages/adminPanel/avoirs.html',
		               })

            //route for the dashboard page
            .state('dashboard', 
            {
                url :'/dashboard',
                templateUrl : 'pages/dashboard.html',
                parent: 'menu'
            })

            // route for the contact page
            .state('contact', 
            {   
                url :'/contact',
                parent: 'menu',
                templateUrl : 'pages/contact.html',
            })

            // route for the commander page
            .state('commander', 
            {
                url :'/commander',
                parent: 'menu',
                templateUrl : 'pages/commander.html',
            })

            // route for the commander page
            .state('monCompte', 
            {
                url :'/monCompte',
                parent: 'menu',
                templateUrl : 'pages/monCompte.html'
            })
            
            $locationProvider.html5Mode(true);
    })




// catch location chnage and return to login page if user is not logged

.run(['$rootScope', '$location', '$http',
    function ($rootScope, $location, $http) {
        // keep user logged in after page refresh

        $rootScope.globals = Cookies.getJSON('globals') || {};

        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
 		
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser ) {

            		  $location.path('/login');
              
            }
        });
    }]);








