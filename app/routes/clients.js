var clients = require('../models/clients');

    module.exports = function(app) {

       // routes ======================================================================
       // get all clients
        app.get('/api/clients', function(req, res) {

            // use mongoose to get all nerds in the database
            clients.find( function(err, avoirs) {

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


       // get clients historique
        app.get('/api/clientsHistorique', function(req, res) {

             var client_id = req.query.client_id;

            // use mongoose to get all nerds in the database
            clients.find({_id : client_id}, {'commandes':1, 'factures':1, 'avoirs':1, '_id': 0}, function(err, historique) {

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
                              
                        res.json(historique[0]); 
                        
                      
                    }
         

                });
        });


       // get clients infos
        app.get('/api/clientsInfos', function(req, res) {

            var client_id = req.query.client_id;

            // use mongoose to get all nerds in the database
            clients.find({_id : client_id}, {'commandes':0, 'factures':0, 'avoirs':0, 'stock':0, 'notifications':0, '_id': 0}, function(err, infos) {

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
                              
                        res.json(infos[0]); 
                        
                      
                    }
         

                });
        });



	    app.put('/api/editClientInfos', function(req, res) {

	            var client_id = req.body.client_id;
	            var clientInfos = req.body.editedInfos;


	                                       //change qty for one product from card 
	                                        clients.update(

	                                            {_id: client_id},
	                                            { $set:{ 
	                                            			"nom":clientInfos.nom, 
	                                            			"tel":clientInfos.tel,
	                                            			"fax":clientInfos.fax, 
	                                            			"tva":clientInfos.tva,
	                                            			"adresse_fac":clientInfos.adresse_fac, 
	                                            			"BU":clientInfos.BU,
	                                            			"commercial":clientInfos.commercial, 
	                                            			"code_fac":clientInfos.code_fac,
	                                            			"ville_fac":clientInfos.ville_fac, 
	                                            			"ville":clientInfos.ville,
	                                            			"adresse_livraison":clientInfos.adresse_livraison, 
	                                            			"email":clientInfos.email,
	                                            			"nom_gerent":clientInfos.nom_gerent, 
	                                            			"tel_gerent":clientInfos.tel_gerent,
	                                            			"forme_juridique":clientInfos.forme_juridique, 
	                                            			"ville_livraison":clientInfos.ville_livraison,
	                                            			"registre":clientInfos.registre, 
	                                            			"fiscale":clientInfos.fiscale,
	                                            			"art_import":clientInfos.art_import, 
	                                            			"remise":clientInfos.remise,
	                                            			"convention_annuelle":clientInfos.convention_annuelle, 
	                                            			"benefice_annuelle":clientInfos.benefice_annuelle,                                            				                                            				                                            			
	                                            		}
	                                            },
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