var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost', // MySQL서버가 어디에 있냐?
    // node랑 같은 서버에 있다면 localhost
  user     : 'root',
  password : 'qwerty123',
  database : 'opentutorials'
});
 
connection.connect();
 
connection.query('SELECT * FROM topic', (error, results, fields) => {
  if (error) {
    console.log("------ERROR------");
    console.log(error);
  }
  console.log("---- QUERY SUCCESS ----");
  console.log(results);
});
 
connection.end();