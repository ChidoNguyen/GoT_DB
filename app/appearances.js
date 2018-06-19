module.exports = function (){
	var express = require('express');
	var router = express.Router();
	
	// Get appearances relations from database
	function getAppearances(res, mysql, context, complete) {
		mysql.pool.query("SELECT E.ID as EID, E.Title as Title, E.Season as Season, E.Season_ep as Episode, C.ID as CID, C.Name as Name FROM Appearances A INNER JOIN Episodes E ON A.EpisodeID = E.ID INNER JOIN Characters C ON A.CharacterID = C.ID ORDER BY C.Name", function(error , results, fields){
			if (error) {
				context.error = JSON.stringify(error);
                res.render('error', context);
			}
			context.appearances = results;
			complete();
		});
	}
	
	// Get all appearances filtered by particular character
	function getFilteredAppearances(res, mysql, context, character, complete) {
		var sql = "SELECT E.ID as EID, E.Title as Title, E.Season as Season, E.Season_ep as Episode, C.ID as CID, C.Name as Name FROM Appearances A INNER JOIN Episodes E ON A.EpisodeID = E.ID INNER JOIN Characters C ON A.CharacterID = C.ID WHERE C.ID = ?";
		var insert = [character];
		sql = mysql.pool.query(sql, insert, function(error , results, fields){
			if (error) {
				context.error = JSON.stringify(error);
                res.render('error', context);
			}
			context.appearances = results;
			complete();
		});
	}

	// Get characters grouped by name
	function getGroupedAppearances(res, mysql, context, complete) {
		mysql.pool.query("SELECT E.ID as EID, E.Title as Title, E.Season as Season, E.Season_ep as Episode, C.ID as CID, C.Name as Name FROM Appearances A INNER JOIN Episodes E ON A.EpisodeID = E.ID INNER JOIN Characters C ON A.CharacterID = C.ID GROUP BY C.Name ORDER BY C.Name", function(error , results, fields){
			if (error) {
				context.error = JSON.stringify(error);
                res.render('error', context);
			}
			context.groupedAppearances = results;
			complete();
		});
	}

	// Get seasons from database via Episodes table
	function getSeason(res, mysql, context, complete) {
		mysql.pool.query("SELECT distinct(Season) From `Episodes` ORDER BY Season", function(error, results, fields){
			if (error) {
				context.error = JSON.stringify(error);
                res.render('error', context);
			}
			context.distinctSeason = results;
			complete();
		});
	}
	
	// Get characters from database
	function getCharacters(res, mysql, context, complete) {
		mysql.pool.query("SELECT ID, Name FROM Characters" , function(error, results, fields) {
			if (error) {
				context.error = JSON.stringify(error);
                res.render('error', context);
			}
			context.characters = results;
			complete();
		});
	}

	// Get episode number from particular season
	function getSeasonEp(res, mysql, context, season_episode, complete) {
		var sql = "SELECT ID, Season, Season_Ep as episodes FROM Episodes WHERE Season = ?";
		var insert = [season_episode];
		sql = mysql.pool.query(sql, insert, function(error, results, fields) {
			if (error){
				context.error = JSON.stringify(error);
                res.render('error', context);
			}
			context.sep = results;
			complete();
		});
	}
		
	// Handle GET request to show appearances
	router.get('/', function(req, res){
		var callbackCount = 0;
		var context = {};
		var mysql = res.app.get('mysql');
		context.jsscripts = ["deleteAppearance.js", "selectedSeason.js"];
		getAppearances(res, mysql, context, complete);
		getGroupedAppearances(res, mysql, context, complete);
		getSeason(res, mysql, context, complete);
		getCharacters(res, mysql, context, complete);
		function complete() {
			callbackCount++;
			if (callbackCount >= 4){
				res.render('appearances', context);
			}
		}
	});

	// Handle POST request to filter by character
	router.get('/filter-character', function(req, res) {
		var callbackCount = 0;
		var context = {};
		var mysql = res.app.get('mysql');
		context.jsscripts = ["deleteAppearance.js", "selectedSeason.js"];
		getAppearances(res, mysql, context, complete);
		getGroupedAppearances(res, mysql, context, complete);
		getSeason(res, mysql, context, complete);
		getCharacters(res, mysql, context, complete);
		getFilteredAppearances(res, mysql, context, req.query.filteredCharacter, complete);
		function complete() {
			callbackCount++;
			if (callbackCount >= 5){
				res.render('appearances', context);
			}
		}
	});

	// Handle first POST request to filter out specific episodes of seasons for adding
	router.post('/filter', function(req, res) {
	    var callbackCount = 0;
		var context = {};
		var mysql = res.app.get('mysql');
		context.jsscripts = ["deleteAppearance.js", "selectedSeason.js"];
		getAppearances(res,mysql,context,complete);
		getSeason(res,mysql,context,complete);
		getCharacters(res,mysql,context,complete);
		getSeasonEp(res,mysql,context,req.body.seasonFilter, complete);
		context.seasonNumber = [req.body.seasonFilter];
		function complete() {
			callbackCount++;
			if (callbackCount >= 4) {
				res.render('appearances',context);
			}
		}
	});
	
	// Handle second POST request for when user links episode to character for adding
	router.post('/', function(req, res) {
		var context = {};
		var mysql = req.app.get('mysql');
		var sql = "INSERT INTO `Appearances` (EpisodeID, CharacterID) VALUES (?, ?)";
		var inserts = [req.body.filterEp, req.body.filterChar];
		sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
			if (error) {
				context.error = JSON.stringify(error);
                res.render('error', context);
			} else {
				res.redirect('/appearances');
			}
		});
	});
	
	// Handle DELETE request to remove appearance
	router.delete('/:eid/:cid', function(req, res) {
		var context = {};
		var mysql = req.app.get('mysql');
		var sql = "DELETE FROM `Appearances` WHERE EpisodeID = ? AND CharacterID = ?";
		var inserts = [req.params.eid, req.params.cid];
		sql = mysql.pool.query(sql,inserts, function(error, results, fields) {
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