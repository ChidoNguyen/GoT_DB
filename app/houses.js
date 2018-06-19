module.exports = function() {
    var express = require('express');
    var router = express.Router();

    // Get houses from database
    function getHouses(res, mysql, context, complete) {        
        mysql.pool.query("SELECT H.ID, H.Name AS Name, H.Motto AS Motto, H.Sigil AS Sigil, L.Name AS Location FROM `Houses` H INNER JOIN `Locations` L ON H.LocationID = L.ID", function(error, results, fields) {
            if (error) {
                context.error = JSON.stringify(error);
                res.render('error', context);
            }
            context.houses = results;
            complete();
        });
    }

	// Get all locations from database
	function getLocations(res, mysql, context, complete) {        
        mysql.pool.query("SELECT ID, Name FROM Locations", function(error, results, fields) {
            if (error) {
                context.error = JSON.stringify(error);
                res.render('error', context);
            }
            context.locations = results;
            complete();
        });
    }
	
	// Get single house in database for updating
	function getHouse(res, mysql, context, id, complete) {
		var sql = "SELECT ID, Name, Motto, Sigil, LocationID FROM Houses WHERE ID = ?";
		var inserts = [id];
		mysql.pool.query(sql,inserts, function(error, results, fields) {
            if (error) {
                context.error = JSON.stringify(error);
                res.render('error', context);
            }
            context.houses = results[0];
            complete();
        });
    }
	
    // Handle GET request to display houses
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
		context.jsscripts = ["deleteHouse.js"]
        var mysql = req.app.get('mysql');
        getHouses(res, mysql, context, complete);
		getLocations(res, mysql, context, complete);
        function complete() {
			callbackCount++;
			if (callbackCount >= 2) {
            	res.render('houses', context);
			}
        }
    });

	// Handle GET request to update house
	router.get('/:id', function(req, res){
        var callbackCount = 0;
        var context = {};
		context.jsscripts = ["selectedLocation.js", "updateHouse.js"]
        var mysql = req.app.get('mysql');
        getHouse(res, mysql, context,req.params.id, complete);
		getLocations(res, mysql, context, complete);
        function complete() {
			callbackCount++;
			if (callbackCount >= 2){
            	res.render('update-house', context);
			}
        }
    });
    
    // Handle PUT request to update house
	router.put('/:id', function(req, res){
		var context = {};
		var mysql = req.app.get('mysql');
		var sql = "UPDATE Houses SET Name = ? , Motto = ? , Sigil = ? , LocationID = ? WHERE ID=?";
		var inserts = [req.body.name, req.body.motto, req.body.sigil, req.body.location, req.params.id];
		sql = mysql.pool.query(sql, inserts, function(error, results, fields){
			if (error){
                context.error = JSON.stringify(error);
                res.render('error', context);
			} else {
				res.status(200);
				res.end();
			}
		});
	});

	// Handle POST request to insert new house
	router.post('/', function(req, res){
		var context = {};
		var mysql = req.app.get('mysql');
		var sql = "INSERT INTO `Houses` (Name, Motto, Sigil, LocationID) VALUES (?,?,?,?)";
		var inserts = [req.body.name, req.body.motto, req.body.sigil, req.body.location];
		sql = mysql.pool.query(sql,inserts,function(error, results, fields){
			if (error) {
				context.error = JSON.stringify(error);
                res.render('error', context);
			} else {
				res.redirect('/houses');
			}
		});
	});
	
	// Handle DELETE request to remove house
	router.delete('/:id', function(req, res){
		var context = {};
		var mysql = req.app.get('mysql');
		var sql = "DELETE FROM `Houses` WHERE ID = ?";
		var inserts = [req.params.id];
		sql = mysql.pool.query(sql,inserts,function(error, results, fields){
			if (error) {
                context.error = JSON.stringify(error);
                res.render('error', context);
			} else {
				res.status(202).end();
			}
		});
	});

    return router;
} ();