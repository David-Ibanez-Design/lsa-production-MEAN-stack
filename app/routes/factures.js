var clients = require('../models/clients');

    module.exports = function(app) {

       // routes ======================================================================

        // retreve all orders
         app.get('/api/factures', function(req, res) {

            var client_id = req.query.client_id;

                    //find the right client and retreave commandes
                    clients.findOne({_id: client_id}, {'factures':1}, function(err, factures) {

                        if(err)
                             {
                                return res.send(err);
                             }
                             else
                             {
                                return res.json(factures);
                             }
                      
                    });

        })


        // update invoice statue
         app.put('/api/facture-updatStatue', function(req, res, mongoose) {

                      var invoice_id = req.body.id;
                      var statue = req.body.statue;
                      var client_id = req.body.client_id;

                        clients.update(

                            {'_id': client_id , 'factures._id' : invoice_id},
                            { $set:{ "factures.$.statue":statue } },
                            function(err,model){
                                 if(err)
                                 {
                                    console.log(err);
                                    return res.send(err);
                                 }
                                 else
                                 {

                                            clients.findOne({'factures._id': invoice_id},{}, function(err,model){

                                                 if(err)
                                                   {
                                                      console.log(err);
                                                      return res.send(err);
                                                   }
                                                   else
                                                  {

                                                    for(i in model.factures)
                                                      {
                                                        if(model.factures[i]._id == invoice_id)
                                                        {
                                                            return res.json(model.factures[i]);
                                                        }
                                                      }
                                                    
                                                  }

                                           })
                                 }

                            });


       }) 
   
    };