
// grab the nerd model we just created
var User = require('../models/user');

    module.exports = function(app) {

       // routes ======================================================================

        app.post('/api/logins', function(req, res) {

            // use mongoose to get all nerds in the database
            User.findOne({utilisateur: req.body.username, mot_de_passe: req.body.password } , function(err, user) {

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
                        if (user) 
                        {

                           res.json({
                                success: true,
                                data: user,
                            }); 
                        } 
                        else 
                        {
                            res.json({
                                type: false,
                                message: "Incorrect email/password"
                            });    
                        }
                    }
         

                });
        });

    
    };