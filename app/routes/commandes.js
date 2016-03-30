var clients = require('../models/clients');
var Produits = require('../models/products');

    module.exports = function(app) {

       // routes ======================================================================


        // retreve all orders
         app.get('/api/commandes/', function(req, res) {

            var client_id = req.query.client_id;

                    //find the right client and retreave commandes
                    clients.findOne({_id: client_id}, {'commandes':1}, function(err, commandes) {

                        if(err)
                             {
                                return res.send(err);
                             }
                             else
                             {
                                return res.json(commandes);
                             }
                      
                    });

        })

        // retreve one orders
         app.get('/api/get-oneOrder', function(req, res) {

            var client_id = req.query.client_id;;
			var numCommande = req.query.numCommande;
                    //find the right client and retreave commandes
                    clients.findOne({_id: client_id, 'commandes.num_commande': numCommande  }, {'commandes':1}, function(err, commandes) {

                        if(err)
                             {
                                return res.send(err);
                             }
                             else
                             {
                             	 var nb_order = commandes.commandes.length


	                            // insert commande products ids into array
	                            for(i=0; i<nb_order; i++)
	                            {
	                            	if(commandes.commandes[i].num_commande ==numCommande )
	                            	{
	                            		oneOrder = commandes.commandes[i];
	                            	}
	                                
	                            }
                             	
                                return res.json(oneOrder);
                             }
                      
                    });

        })
         // create an sale order from cart validation
         app.post('/api/addcommande-invoice', function(req, res) {

              var client_id = req.query.client_id;
              // get order array sent from the cart
              var order = req.body.order
              var invoice = req.body.invoice             
              var num_commande = 0

              // generate random number for order and invoice
              function generateNumCommande() {
                    var random = Math.floor(100000000 + Math.random() * 900000000);
                    num_commande = 'NH'+random
               }

              generateNumCommande();

              order.num_commande = num_commande;
              invoice.num_commande = num_commande;




                                              
                          clients.findOneAndUpdate({ _id: client_id},{ $push: {"commandes": order, "factures": invoice}},{  safe: true, upsert: true,  new: true }, function(err, listCommande) {

                                  if(err)
                                   {
                                      console.log(err);
                                      //return res.send(err);
                                   }
                                   else
                                   {



                                      return res.json
                                        ({
                                              order : listCommande.commandes[listCommande.commandes.length-1],
                                              invoice : listCommande.factures[listCommande.factures.length-1]
                                        });
                                   }

                                    

                          });





                      
                     
         });

        // update order statue
         app.put('/api/commande-updatStatue', function(req, res, mongoose) {

                                      var order_id = req.body.id;
                                      var statue = req.body.statue;
                                      var client_id = req.body.client_id;

                                        clients.update(

                                            {'_id': client_id , 'commandes._id' : order_id},
                                            { $set:{ "commandes.$.statue":statue } },
                                            function(err,model){
                                                 if(err)
                                                 {
                                                    console.log(err);
                                                    return res.send(err);
                                                 }
                                                 else
                                                {

                                                   clients.findOne({'commandes._id': order_id},{}, function(err,model){
                                                                if(err)
                                                           {
                                                              console.log(err);
                                                              return res.send(err);
                                                           }
                                                           else
                                                          {

                                                            for(i in model.commandes)
                                                              {
                                                                if(model.commandes[i]._id == order_id)
                                                                {
                                                                    return res.json(model.commandes[i]);
                                                                }
                                                            }
                                                            
                                                          }

                                                   })
                                                  
                                                }

                                                  
                                            });


       }) 


};