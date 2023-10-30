const mysql = require("mysql");

connection = mysql.createConnection({
  hots: "localhost",
  user: "root",
  password: "root",
  database: "epicsportexperience"
});

connection.connect((err) => {
  if(err){
    console.log("Error connecting: " + err.stack)
    return
  }
  console.log("Conexión correcta " + connection.threadId);
});

module.exports = connection;