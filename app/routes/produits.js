// grab the nerd model we just created
var Products = require('../models/products');




    module.exports = function(app) {

       // routes ======================================================================

        app.get('/api/produits', function(req, res) {

            // use mongoose to get all nerds in the database
            Products.find( function(err, products) {

                //user est null si le requête échoue sinon elle contien le réponse serveur
                
                    if (err) // if there is an error retrieving, send the error. 
                    {
                        res.json({
                            type: false,
                            data: "Error occured: " + err
                        });
                    } 
                    else 
                    {
                              

                        res.json(products); 
                      
                    }
         

                });
        });






        //add produits
        app.post('/api/add-produits', function(req, res, mongoose) {

          
           new Products(req.body.produit).save(function(err, product) {
             if (err) // if there is an error retrieving, send the error. 
                    {
                        res.json({
                            type: false,
                            data: "Error occured: " + err
                        });
                    } 
                    else 
                    {        
                       res.json(product[product.length-1]); 
                    }
          });


        });

        //del produits
        app.del('/api/del-produits/:id', function(req, res, mongoose) {


           Products.findByIdAndRemove(req.params.id, function(err,results){
                             if(err)
                             {
                                console.log(err);
                                return res.send(err);
                             }
                             else
                             {
                                 res.json(results);
                             }
                              
                        });


        });

        // get all product promo
        app.get('/api/produitsPromo', function(req, res) {

            // use mongoose to get all nerds in the database
            Products.find({ "promo": { "$gt": 0 }}).limit(4).exec(function(err, productsPromo) {

                //user est null si le requête échoue sinon elle contien le réponse serveur
                
                    if (err) // if there is an error retrieving, send the error. 
                    {
                        res.json({
                            type: false,
                            data: "Error occured: " + err
                        });
                    } 
                    else 
                    {
                              
                        
                        res.json(productsPromo); 
                      
                    }
         

                });
        });

    
    };