const connection = require("../db/db.js");

class HomeController {

  viewHome = (req, res) => {

    let sql1 = "select * from experience where experience_is_delete = 0";

    let sql2 = "select * from locality where locality_is_delete = 0";

    let sql3 = `select type_activitie from experience where type_activitie != "" and experience_is_delete = 0 group by type_activitie`;

    connection.query(sql1, (error, result1) => {
      console.log(result1)
      if (error) throw error;
      connection.query(sql2, (error, result2) => {
        if (error) throw error;
        connection.query(sql3, (error, result3) => {
          if (error) throw error;
          console.log(result3)
          res.render("home", { result1, result2, result3 })
        });
      });
    });
    
    
  }









  
}

module.exports = new HomeController;