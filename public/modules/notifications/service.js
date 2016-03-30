angular.module('notifications')

.factory('notificationsFact', function ($resource) {

      return {

		    	list 			: $resource(
		    					'/api/getNotifications',
			    	 			{'query': { method: 'GET'}}
			    	 			),

				create 			: $resource(
								'/api/addNotifications/',
								{data:'@notifications', client_id : '@client_id'},
			    	 			{'query': { method: 'POST'}, isArray:false}
			    	 			),

      }

})


  
.service('centre_de_notifications',function(notificationsFact){


    var notifications = {}


    var list = [];
    init()


    function init(){
        
        list = notificationsFact.list.query({client_id : Cookies.getJSON('globals').currentUser.id});

    }


    var getList = function(){
        return list;
    };

    var getListCount = function(){

        return list.length;
    };


   var add = function(cat, action, docAdded){

        notifications.categorie = cat;
        notifications.img = '';
        notifications.num_commande = docAdded.num_commande;



        var messages = { 

            order_created : 'La commande N°:' + notifications.num_commande + ' viens juste d\'être engeristré dans notre système. Pour plus de détails veuillez consulter le liste de vos commandes. Si vous n\'êtes pas à l\'origine de cette commande veuillez nous contacter imédiatement.', 
            status_changed: 'Un élément liée à la commande N°: ' + notifications.num_commande +' viens de changer de statue, veuillez tenir compte de cette évolution et du niveau de priorité associer', 
            cancel: 'Attention! la commande N°: ' + notifications.num_commande +' viens d\'être annuler. Pour plus de détails veuillez consulter le liste de vos commandes. Si vous n\'êtes pas à l\'origine de cette commande veuillez nous contacter imédiatement.', 
            arrivage: 'Un nouveau produit est disponible à l\'achat dans vôtre boutique en ligne.', 
            avoir: 'l\'avoir liée à la commande N°: ' + notifications.num_commande +' viens d\'être générer pour l\'une de vos commande, Pour plus de détails veuillez consulter le liste de vos avoir.'  
        }


        switch(cat) {
            //if it an invoie or an order
            case 'Invoice':
            case 'Order':


                switch(action) {

                    case 'created':

                        notifications.nom = 'creation';
                        notifications.priorite = 'faible';
                        notifications.message = messages.order_created;

                        break;

                    case 'status changed':

                        notifications.nom = 'status changed';
                        notifications.priorite = 'Haute';
                        notifications.message = messages.status_changed;

                        break;

                    case 'cancel':

                        notifications.nom = 'cancel';
                        notifications.priorite = 'Critical';
                        notifications.message = messages.cancel;

                        break;
                    }

                break;


            case 'Arrivage de produits':
            
                    notifications.nom = 'Information';
                    notifications.priorite = 'Moyenne';
                    notifications.message = messages.arrivage;

                break;

            case 'Avoir':

                switch(action) {

                    case 'creation':

                        notifications.nom = 'creation';
                        notifications.priorite = 'Haute';
                        notifications.message = messages.avoir;

                        break;

                    case 'status changed':

                        notifications.nom = 'status changed';
                        notifications.priorite = 'Haute';
                        notifications.message = messages.status_changed;

                        break;

                }
                


                break;

        } 
       

        notificationsFact.create.query({data : notifications, client_id : Cookies.getJSON('globals').currentUser.id}, function(data){

            list.push(notifications);

        }) 

    };


    var delProd = function(){
        
    }

    return{
        getList: getList,
        add: add,
        delProd: delProd,
        getListCount: getListCount

    };


})
