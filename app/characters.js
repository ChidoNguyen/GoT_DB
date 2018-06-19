module.exports = function() {
    var express = require('express');
    var router = express.Router();

    // Get characters from database
    function getCharacters(res, mysql, context, complete) {        
        mysql.pool.query("SELECT C.ID, C.Name, H.Name AS House, L.Name AS Location, C.Biography FROM Characters C LEFT JOIN Houses H ON C.HouseID = H.ID LEFT JOIN Locations L ON C.Birthplace = L.ID", function(error, results, fields) {
            if (error) {
                context.error = JSON.stringify(error);
                res.render('error', context);
            }
            context.characters = results;
            complete();
        });
    }

    // Get single character from database
    function getCharacter(res, mysql, context, id, complete){
        var sql = "SELECT ID, Name, HouseID, Birthplace, Biography FROM Characters WHERE id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if (error){
                context.error = JSON.stringify(error);
                res.render('error', context);
            }
            context.character = results[0];
            complete();
        });
    }

    // Get houses from database
    function getHouses(res, mysql, context, complete) {        
        mysql.pool.query("SELECT H.ID, H.Name AS Name, H.Motto AS Motto, H.Sigil AS Sigil, L.Name AS Location FROM `Houses` H LEFT JOIN `Locations` L ON H.LocationID = L.ID", function(error, results, fields) {
            if (error) {
                context.error = JSON.stringify(error);
                res.render('error', context);
            }
            context.houses = results;
            complete();
        });
    }

    // Get locations from database
    function getLocations(res, mysql, context, complete) {        
        mysql.pool.query("SELECT ID, Name, Continent, Slave FROM Locations", function(error, results, fields) {
            if (error) {
                context.error = JSON.stringify(error);
                res.render('error', context);
            }
            context.locations = results;
            complete();
        });
    }

    // Handle GET request to display characters and add character form
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteCharacter.js"];
        var mysql = req.app.get('mysql');
        getCharacters(res, mysql, context, complete);
        getHouses(res, mysql, context, complete);
        getLocations(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            // Wait for all callbacks to complete before rendering
            if (callbackCount >= 3){
                res.render('characters', context);
            }
        }
    });

    // Handle GET request to display character to be updated
    router.get('/:id', function(req, res) {
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectedHouse.js", "selectedLocation.js", "updateCharacter.js"];
        var mysql = req.app.get('mysql');
        getCharacter(res, mysql, context, req.params.id, complete);
        getHouses(res, mysql, context, complete);
        getLocations(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            // Wait for all callbacks to complete before rendering
            if (callbackCount >= 3){
                res.render('update-character', context);
            }
        }
    });

    // Handle PUT request to update character
    router.put('/:id', function(req, res) {
        var context = {};
        var mysql = req.app.get('mysql');
        var sql = "UPDATE Characters SET Name = ?, HouseID = ?, Birthplace = ?, Biography = ? WHERE ID = ?";
        var inserts = [req.body.name, req.body.house, req.body.location, req.body.biography, req.params.id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields) {
            if (error) {
                context.error = JSON.stringify(error);
                res.render('error', context);
            } else {
                res.status(200);
                res.end();
            }
        });
    });

    // Handle POST request to add character
    router.post('/', function(req, res){
        var context = {};
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO `Characters` (Name, HouseID, Birthplace, Biography) VALUES (?,?,?,?)";
        var inserts = [req.body.name, req.body.house, req.body.location, req.body.biography];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields) {
            if (error){
                context.error = JSON.stringify(error);
                res.render('error', context);
            } else {
                res.redirect('/characters');
            }
        });
    });

	// Handle DELETE to remove character
    // Table schema allows for deleting with foreign keys by using ON DELETE SET NULL
    router.delete('/:id', function(req,res) {
		var context = {};
        var mysql = req.app.get('mysql');
		var sql = "DELETE FROM `Characters` WHERE ID = ?";
		var inserts = [req.params.id];
		sql = mysql.pool.query(sql,inserts,function(error,results,fields){
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
