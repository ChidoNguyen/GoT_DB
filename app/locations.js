module.exports = function (){
	var express = require('express');
	var router = express.Router();
	
	// Get locations from database
	function getLocations(res, mysql, context, complete) {
		mysql.pool.query("SELECT ID, Name, Continent, Slave FROM `Locations` WHERE Name != 'None'", function( error, results, fields){
			if (error) {
				context.error = JSON.stringify(error);
                res.render('error', context);
			}
			context.locations = results;
			complete();
		});
	}

	// Get one location from database
	function getLocation(res, mysql, context, id, complete) {
		var sql = "SELECT ID, Name, Continent, Slave FROM `Locations` WHERE ID = ?";
		var insert = [id];
		mysql.pool.query(sql, insert, function(error,results,fields) {
			if (error) {
				context.error = JSON.stringify(error);
                res.render('error', context);
			}
			context.locations = results[0];
			complete();
		});
	}
	
	// Handle GET request to show locations
	router.get('/', function(req, res){
		var callbackCount = 0;
		var context = {};
		context.jsscripts =["deleteLocation.js"];
		var mysql = req.app.get('mysql');
		getLocations(res, mysql, context, complete);
		function complete(){
			callbackCount++;
			if (callbackCount >= 1) {
				res.render('locations', context);
			}
		}
	});

	// Handle GET request for updating location
	router.get('/:id', function(req, res){
		var callbackCount = 0;
		var context = {};
		context.jsscripts = ["updateLocation.js"];
		var mysql = req.app.get('mysql');
		getLocation(res, mysql, context, req.params.id, complete);
		function complete() {
			callbackCount++;
			if (callbackCount >= 1) {
				res.render('update-location', context);
			}
		}
	});

	// Handle PUT request for updating location
	router.put('/:id', function(req, res){
		var context = {};
		var mysql = req.app.get('mysql');
		var sql = "UPDATE Locations SET Name = ?, Continent = ?, Slave = ? WHERE ID = ?";
		var inserts = [req.body.name, req.body.continent, req.body.slave, req.params.id];
		sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
			if (error) {
				context.error = JSON.stringify(error);
                res.render('error', context);
			} else {
				res.status(200);
				res.end();
			}
		});
	});

	// Handle POST request for adding new location
	router.post('/', function(req, res){
		var context = {};
		var mysql = req.app.get('mysql');
		var sql = "INSERT INTO `Locations` (Name, Continent, Slave) VALUES (?,?,?)";
		var inserts = [req.body.name, req.body.continent, req.body.slave];
		sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
			if (error) {
				context.error = JSON.stringify(error);
                res.render('error', context);
			} else {
				res.redirect('/locations');
			}
		});
	});
	
	// Handle DELETE request for deleting location
	router.delete('/:id', function(req, res){
		var context = {};
		var mysql = req.app.get('mysql');
		var sql = "DELETE FROM `Locations` WHERE ID = ?";
		var inserts = [req.params.id];
		sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
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