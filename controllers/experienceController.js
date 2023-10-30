const connection = require("../db/db.js");

class ExperienceController {

  viewExperience = (req, res) => {
    const experience_id = req.params.experience;

    let sql = `select * from experience where experience_is_delete = 0 and experience_id = ${experience_id}`

    connection.query(sql, (error, result) =>{
      if (error) throw error;
      console.log(result)
      res.render ("experience", { result })
    })
    
  }


  viewCreateExperience = (req, res) => {
    let locality_id = req.params.locality;

    res.render("createExperience", {locality_id})
  }

  createExperience = (req, res) => {

    const {title, type_activitie, street, town, experience_description} = req.body;
    const locality_id = req.params.locality;
    
    if (title == ""){
      return res.render ("createExperience", {locality_id, message1: "¡El campo no puede estar vacio!"})
    }else if (type_activitie == ""){
      return res.render ("createExperience", {locality_id, message2: "¡El campo no puede estar vacio!"})
    }else if (street == ""){
      return res.render ("createExperience", {locality_id, message3: "¡El campo no puede estar vacio!"})
    }else if (town == ""){
      return res.render ("createExperience", {locality_id, message4: "¡El campo no puede estar vacio!"})
    }else if (experience_description > 254){
      return res.render ("createExperience", {locality_id, message5: "¡Descripción demasiado larga!"})
    }

    let sql = `insert into experience (title, type_activitie, street, town, experience_description, locality_id) value ("${title}", "${type_activitie}", "${street}", "${town}", "${experience_description}", ${locality_id})`

    if (req.file != undefined){
      let imgName = req.file.filename;

      sql = `insert into experience (title, type_activitie, street, town, experience_description, locality_id, experience_img) value ("${title}", "${type_activitie}", "${street}","${town}", "${experience_description}", ${locality_id}, "${imgName}")`
    }

      connection.query(sql, (error, result) => {
        if (error) throw error;
        res.redirect(`/locality/login/profile/${locality_id}`);
      });
   
  }

  deleteExperience = (req, res) => {
    let locality_id = req.params.locality;
    let experience_id = req.params.experience;

    let sql = `UPDATE experience set experience_is_delete = 1 WHERE experience_id = ${experience_id}`

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.redirect(`/locality/login/profile/${locality_id}`);
     })
   
  }

  viewModifExperience = (req, res) => {
    let experience_id = req.params.experience;
    let locality_id = req.params.locality;

    let sql = `select * from experience where experience_id = ${experience_id}`;

    connection.query(sql, (error, result) => {
      console.log(result)
      res.render("editExperience", { result, locality_id });
    })
  }

  
  modifExperience = (req, res) => {
    let {title, type_activitie, town, street, experience_description} = req.body;
    let locality_id = req.params.locality;
    let experience_id = req.params.experience;

      
    let sql = `update experience set title = "${title}", type_activitie = "${type_activitie}", town = "${town}", street = "${street}", experience_description = "${experience_description}" where experience_id = ${experience_id}`
  
    if (req.file != undefined){
      let imgName = req.file.filename;
  
      sql = `update experience set title = "${title}", type_activitie = "${type_activitie}", town = "${town}", street = "${street}", experience_description = "${experience_description}", experience_img = "${imgName}" where experience_id = ${experience_id}`
    }
  
    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.redirect(`/locality/login/profile/${locality_id}`);
    })
  
  }














}



module.exports = new ExperienceController;