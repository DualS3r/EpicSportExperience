const connection = require("../db/db.js");
const bycrypt = require("bcrypt");

class LocalityController {

  viewCreateLocality = (req, res) => {
    res.render("createLocality");
  }

  createLocality = (req, res) => {
    const {name, province, phone, description, email, password} = req.body;
    const salt = 10

    
    if (name == ""){
      return res.render ("createLocality", {message1: "¡El campo no puede estar vacío!"})
    }else if (phone == ""){
      return res.render ("createLocality", {message2: "¡El campo no puede estar vacío!"})
    }else if (email == ""){
      return res.render ("createLocality", {message3: "¡El campo no puede estar vacío!"})
    }else if (password == ""){
      return res.render ("createLocality", {message4: "¡El campo no puede estar vacío!"})
    }else if (description.length > 254){
      return res.render ("createLocality", { message5: "¡Descripción demasiado larga!"})
    }

    let sql2 = "select * from locality"

    connection.query(sql2, (error, result2) =>{
      if (error) throw error;
      let found = false;

      for(let i = 0; i < result2.length && !found; i++){
        if(`${email}` == result2[i].email){
          found = true;
        }
      }

      if(!found){

        bycrypt.hash(password, salt, (error, hash) => {
          if(error) throw error;
    
          let sql = `insert into locality (name, province, email, password, phone, description) value ("${name}", "${province}", "${email}", "${hash}", "${phone}", "${description}")`
    
          if (req.file != undefined){
            let imgName = req.file.filename;
            sql = `insert into locality (name, province, email, password, phone, description, locality_img) value ("${name}", "${province}", "${email}", "${hash}", "${phone}", "${description}", "${imgName}")`
          }
    
          connection.query(sql, (error, result) => {
            if (error) throw error;
            return res.redirect("/");
          })
        })

      } 
      
      else {
        return res.render ("createLocality", {message3: "¡Email ya registrado!"})
      }

    })

    
  }

  viewLocality = (req, res) => {
    const locality_id = req.params.locality;

    let sql = `select l.*, e.* from locality l left join experience e on l.locality_id = e.locality_id and e.experience_is_delete = 0  where l.locality_is_delete = 0 and l.locality_id = ${locality_id}`

    connection.query(sql, (error, result) =>{
      if (error) throw error;
      console.log(result)
      res.render ("locality", { result })
    })
    
  }

  viewPerfilLocality = (req, res) => {
    let locality_id = req.params.locality;

    let sql = `select l.locality_id, l.name, l.province, l.email, l.password, l.phone, l.description, l.locality_img, e.experience_id, e.title, e.type_activitie, e.town, e.street, e.experience_description, e.experience_img from locality l left join experience e on l.locality_id = e.locality_id and e.experience_is_delete = 0  where l.locality_is_delete = 0 and l.locality_id = "${locality_id}"`

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.render("profile", { result })
    })
  }

  viewLogin = (req, res) => {
    res.render("login");
  }

  checkLogin = (req, res) => {
    let {email, password} = req.body;

    let sql = `select l.locality_id, l.name, l.province, l.email, l.password, l.phone, l.description, l.locality_img, e.experience_id, e.title, e.type_activitie, e.town, e.street, e.experience_description, e.experience_img from locality l left join experience e on l.locality_id = e.locality_id and e.experience_is_delete = 0  where l.locality_is_delete = 0 and l.email = "${email}"`

    connection.query(sql, (error, result) => {
      if (error) throw error;
      if (result.length > 0){
        let hash = result[0].password;

        bycrypt.compare(password, hash, (error, resultcomparation) => {
          if(resultcomparation){
            res.render("profile", { result });
          }
          else{
            res.render("login", {message: "¡Datos introducidos incorrectamente!"});
          }
        })
      }
      else {
        res.render("login", {message: "¡Datos introducidos incorrectamente!"});
      }
    })

  }

  deleteLocality = (req, res) => {
    let locality_id = req.params.locality;

    let sql = `UPDATE locality l LEFT JOIN experience e ON l.locality_id = e.locality_id SET l.locality_is_delete = 1, e.experience_is_delete = 1 WHERE l.locality_id = ${locality_id}`

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.render("login", {message2: "¡Borrado correctamente!"})
     })
   
  }

  viewModifLocality = (req, res) => {
    let locality_id = req.params.locality;

    let sql = `select * from locality where locality_id = ${locality_id}`;

    connection.query(sql, (error, result) => {
      res.render("editLocality", { result });
    })
  }

  modifLocality = (req, res) => {
    let {province, name, phone, description} = req.body;
    let locality_id = req.params.locality;
    
    let sql = `update locality set province = "${province}", name = "${name}", phone = "${phone}", description = "${description}" where locality_id = ${locality_id}`

    if (req.file != undefined){
      let imgName = req.file.filename;

      sql = `update locality set province = "${province}", name = "${name}", phone = "${phone}", description = "${description}", locality_img = "${imgName}" where locality_id = ${locality_id}`
    }

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.redirect(`/locality/login/profile/${locality_id}`);
    })

  }

}

module.exports = new LocalityController;