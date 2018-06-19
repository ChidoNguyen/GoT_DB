module.exports = function () {
	var express = require('express');
	var router = express.Router();
	
	// Get episodes from database
	function getEpisodes(res, mysql, context, complete) {
		mysql.pool.query("SELECT ID, Season, Season_ep, Title, Air_Date FROM `Episodes`", function(error, results, fields) {
			if (error){
				context.error = JSON.stringify(error);
                res.render('error', context);
			}
			context.episodes = results;
			complete();
		});
	}

	// Get single episode for updating
	function getEpisode(res, mysql, context, id, complete){
		var sql = "SELECT ID, Season, Season_ep , Title, Air_Date FROM `Episodes` WHERE ID = ?";
		var insert = [id];
		mysql.pool.query(sql, insert, function(error, results, fields) {
			if (error) {
				context.error = JSON.stringify(error);
                res.render('error', context);
			}
			context.episodes = results[0];
			complete();
		});
	}

	// Handle GET request to render episodes
	router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
		context.jsscripts = ["deleteEpisode.js"]
        var mysql = req.app.get('mysql');
        getEpisodes(res, mysql, context, complete);
        function complete() {
			callbackCount++;
			if (callbackCount >= 1){
            	res.render('episodes', context);
			}
        }
    });

	// Handle GET request for updating episodes
	router.get('/:id',function(req, res){
		var callbackCount=0;
		var context ={};
		context.jsscripts = ["updateEpisode.js"];
		var mysql = req.app.get('mysql');
		getEpisode(res, mysql, context, req.params.id, complete);
		function complete(){
			callbackCount++;
			if (callbackCount >= 1){
				res.render('update-episode',context);
			}
		}
	});
	
	// Handle PUT request for updating episodes
	router.put('/:id', function(req, res) {
		var context = {};
		var mysql = req.app.get('mysql');
		var sql = "UPDATE Episodes SET Season = ?, Season_ep = ?, Title = ?, Air_Date = ? WHERE ID = ?";
		var inserts = [req.body.season, req.body.season_ep, req.body.title, req.body.airdate, req.params.id];
		sql = mysql.pool.query(sql,inserts, function(error, results, fields){
			if (error){
				context.error = JSON.stringify(error);
                res.render('error', context);
			} else {
				res.status(200);
				res.end();
			}
		});
	});
	
	// Handle POST request for inserting episodes
	router.post('/',function(req,res){
		var context = {};
		var mysql = req.app.get('mysql');
		var sql = "INSERT INTO `Episodes` (Season, Season_ep, Title, Air_Date) VALUES (?, ?, ?, ?)";
		var inserts = [req.body.season, req.body.season_ep, req.body.title, req.body.airdate];
		sql = mysql.pool.query(sql,inserts,function(error, results, fields){
			if (error) {
				context.error = JSON.stringify(error);
                res.render('error', context);
			} else {
				res.redirect('/episodes');
			}
		});
	});
	
	// Handle DELETE request for deleting episodes
	router.delete('/:id', function (req,res){
		var context = {};
		var mysql = req.app.get('mysql');
		var sql = "DELETE FROM `Episodes` WHERE ID=?";
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