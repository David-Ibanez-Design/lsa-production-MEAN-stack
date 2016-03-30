
angular.module('panel', []);
angular.module('produits', []);
angular.module('panier', []);
angular.module('avoirs', []);
angular.module('commandes', []);
angular.module('factures', []);
angular.module('stocks', []);
angular.module('notifications', []);
angular.module('clients', []);
angular.module('login', []);
angular.module('menu', []);

angular.module('MainApp', [
    'ui.router', 
    'ngResource',
    'panel',
    'produits',
    'panier',
    'commandes',
    'avoirs',
    'factures',
    'stocks',
    'notifications',
    'clients',
    'login',
    'menu',
    ])


var Mainapp = angular.module('MainApp');
