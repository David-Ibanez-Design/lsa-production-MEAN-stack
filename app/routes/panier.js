var Panier = require('../models/panier');
var Produits = require('../models/products');

   module.exports = function(app) {

       // routes ======================================================================

        // retirve panier 
        // call api from client ID to be retrevie when logged in


     app.get('/api/display-panier', function(req, res) {

                    var client_id = req.query.client_id;

                    //find the right card depending on client ID
                    Panier.find({client_id: client_id}, {produits:1, _id:0}).lean().exec(function(err, panier) {

                        
                        if (err) // if there is an error retrieving, send the error. 
                        {
                            res.json({
                                type: false,
                                data: "Error occured: " + err
                            });
                        } 
                        else 
                        {     

                            
                            res.json(panier[0].produits); 
                        }

                        
                    });
         
             
      });

     
      app.post('/api/add-to-panier/', function(req, res, mongoose) {
                            var client_id = req.query.client_id;
                            var product_id = req.body.id;
                            var new_qty = req.body.qty;


                    

                            //find the right product depending on product ID
                            function GetProducts(Produits, Panier, callback )  {


                                    Produits.findOne({_id: product_id}, function(err, produit_to_add) {

                                        // change panier qty to the ones select by user
                                        produit_to_add.qty_panier  = new_qty


                                        //send products ids to callback
                                         callback(produit_to_add);            
                                        
                                    });
                            }




                           // cheack if the product doesn't exist alreday 
                           Panier.count({client_id: client_id , 'produits._id' : product_id}, function (err, count){ 

                                    if(count==0)
                                    {

                                            //get the product from the callback and insert it into the cart
                                           GetProducts(Produits, Panier, function (produit_to_add) {


                                                      // add product to card
                                                      Panier.findOneAndUpdate({ client_id: client_id } ,{ $push: {"produits": produit_to_add}},{  safe: true, upsert: true},function(err, model) {

                                                           if(err)
                                                           {
                                                              console.log(err);
                                                              return res.send(err);
                                                           }
                                                            
                                                            return res.json(
                                                            {
                                                              addedProd : produit_to_add,
                                                              statue : 'sucess',
                                                              message : 'Ce produit à été ajouter'
                                                            });
                                                      });

                     
                                             })
                                      
                                    }
                                    else
                                    {
                                       return res.json({
                                        statue : 'faild',
                                        message : 'Ce produit existe déjà dans le panier'
                                       });
                                    }

                            });
                            

                              

                
                 
                     
      });



      app.del('/api/remove-from-panier/:id', function(req, res, mongoose) {

                                      var client_id = req.query.client_id;
                                      var product_id = req.params.id;

                                       // remove product to card
                                        Panier.update(

                                            {client_id: client_id},
                                            {$pull: {produits: {_id: product_id}}},
                                            function(err,model){
                                                 if(err)
                                                 {
                                                    console.log(err);
                                                    return res.send(err);
                                                 }
                                                  console.log(model)
                                                  return res.json(model);
                                            });

    })


    app.put('/api/changeQty-from-panier/', function(req, res, mongoose) {

                                      var client_id = req.query.client_id;
                                      var product_id = req.body.id;
                                      var new_qty = req.body.qty;


                                       //change qty for one product from card 
                                        Panier.update(

                                            {client_id: client_id , 'produits._id' : product_id},
                                            { $set:{ "produits.$.qty_panier":new_qty } },
                                            function(err,model){
                                                 if(err)
                                                 {
                                                    console.log(err);
                                                    return res.send(err);
                                                 }

                                                  return res.json(model);
                                            });


    })

};