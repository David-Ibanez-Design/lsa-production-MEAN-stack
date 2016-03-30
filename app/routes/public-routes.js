
    module.exports = function(app) {

       // default routes ======================================================================

         app.get('/*', function(req, res) {
       
            res.sendfile('./public/index.html'); // load our public/index.html file
        });

         

    };