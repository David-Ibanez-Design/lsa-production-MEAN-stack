var clients = require('../models/clients');
var produits = require('../models/products');

    module.exports = function(app) {

  // routes ======================================================================

        app.get('/api/stocks', function(req, res) {

               //find the right product depending on product ID
                function GetProducts(produits, clients, callback )  {

                        var client_id = req.query.client_id;

                        //find the right client and retreave factures
                        clients.findOne({_id: client_id}, {'stock':1, '_id':0}, function(err, stock) {


                            var stock_Ids = []
                            var nb_prod = stock.stock.length

                            // insert commande products ids into array
                            for(i=0; i<nb_prod; i++)
                            {
                                stock_Ids.push(stock.stock[i].product_id);
                            }

                            callback(stock, stock_Ids, nb_prod);
                          
                        });

                    
                }


                GetProducts(produits, clients, function (stock, stock_Ids, nb_prod) {

                        //find the right client and retreave factures
                        produits.find({_id: {$in:stock_Ids}},{'nom':1, '_id':0, 'forme':1}, function(err, products) {


                            for(i=0; i<nb_prod; i++)
                            {
                                products[i].qty = stock.stock[i].qty;
                            }

                            if(err)
                                 {
                                    return res.send(err);
                                 }
                                 else
                                 {
                                 	var holder = {
                                 		list : products
                                 	}
                                 	
                                    return res.json(holder);
                                 }
                          
                        });

                      
                })



        })


   
    };