var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_johnsal8',
  password        : 'password-goes-here',
  database        : 'cs340_johnsal8',
  dateStrings	  : 'date'
});

module.exports.pool = pool;
