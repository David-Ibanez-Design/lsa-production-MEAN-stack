var clients = require('../models/clients');

    module.exports = function(app) {

       // routes ======================================================================

        // get all notifications
        app.get('/api/getNotifications', function(req, res) {

            var client_id = req.query.client_id;
            var cutoff = new Date();
            cutoff.setDate(cutoff.getDate()-1);

            // use mongoose to get all nerds in the database
            clients.findOne({_id : client_id},{'notifications':1}, function(err, notifs) {

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

                      // retourne uniquement le notifications plus encienne que cutoff
                      var list = []
                      for(i in notifs.notifications)
                        {
                            if(notifs.notifications[i].date < cutoff)
                            {
                              
                              
                                list.push(notifs.notifications[i])
                            }
                        }
                        
                  
                      return res.json(list);
                        
                    }
         
                });
        });


       //post new notification     
       app.post('/api/addNotifications', function(req, res, mongoose) {                              

                        var client_id = req.query.client_id;
                        var notification = req.body.data;


                        clients.findOneAndUpdate({ _id: client_id} ,{ $push: {"notifications":notification}},{  safe: true, upsert: true},function(err, listCommande) {

                               if(err)
                               {
                                  console.log(err);
                                  return res.send(err);
                               }else{
                                 return res.json(listCommande);
                               }

                               
                          });

        });
                            

   
};