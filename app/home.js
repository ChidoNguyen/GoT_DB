module.exports = function() {
    var express = require('express');
    var router = express.Router();

    // Handle GET request to display homepage
    router.get('/', function(req, res){
        var context = {};
        console.log('rendering');
        res.render('home', context);
    });

    return router;
} ();
