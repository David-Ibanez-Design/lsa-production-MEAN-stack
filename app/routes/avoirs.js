var Avoirs = require('../models/clients');
var produits = require('../models/products');
var client = require('../models/clients');

    module.exports = function(app) {

       // routes ======================================================================

       // list all avoirs
        app.get('/api/avoirs', function(req, res) {

            var client_id = req.query.client_id;
            // use mongoose to get all nerds in the database
            Avoirs.findOne({_id : client_id},{'avoirs':1}, function(err, avoirs) {

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
                              

                        res.json(avoirs); 
                      
                    }
         

                });





            
        });


       //post new avoir     
       app.post('/api/creatAvoir', function(req, res, mongoose) {

                        var avoir = req.body.avoir;;
                        var client_id = req.body.client_id;


                        client.findOneAndUpdate({ _id: client_id } ,{ $push: {"avoirs": avoir}},{  safe: true, upsert: true},function(err, model) {

                               if(err)
                               {
                                  console.log(err);
                                  return res.send(err);
                               }else{
                                 return res.json(model.avoirs[model.avoirs.length]);
                               }

                               
                          });

        });
                            
        // update avoir statue
         app.put('/api/avoir-updatStatue', function(req, res, mongoose) {

                                      var order_id = req.body.id;
                                      var statue = req.body.statue;
                                      var client_id = req.body.client_id;

                                

                                        client.update(

                                            {'_id': client_id , 'avoirs._id' : order_id},
                                            { $set:{ "avoirs.$.statue":statue } },
                                            function(err,model){
                                                 if(err)
                                                 {
                                                    console.log(err);
                                                    return res.send(err);
                                                 }
                                                 else
                                                 {

                                                          client.findOne({'avoirs._id': order_id},{}, function(err,model){

                                                               if(err)
                                                                 {
                                                                    console.log(err);
                                                                    return res.send(err);
                                                                 }
                                                                 else
                                                                {

                                                                  for(i in model.avoirs)
                                                                    {
                                                                      if(model.avoirs[i]._id == order_id)
                                                                      {
                                                                          return res.json(model.avoirs[i]);
                                                                      }
                                                                    }
                                                                  
                                                                }

                                                         })

                                                 }

                                            });


       }) 
   
};