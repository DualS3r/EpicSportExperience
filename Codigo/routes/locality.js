const express = require('express');
const router = express.Router();
const multer = require("../middlewares/multer");
const localityController = require('../controllers/localityController');


router.get("/createLocality", localityController.viewCreateLocality);

router.post("/createLocality", multer("localitys"), localityController.createLocality);

router.get("/login", localityController.viewLogin);

router.post("/login/profile", localityController.checkLogin);

router.get("/login/profile/:locality", localityController.viewPerfilLocality);

router.get("/:locality", localityController.viewLocality);

router.get("/login/profile/deleteLocality/:locality", localityController.deleteLocality);

router.get ("/login/profile/modifLocality/:locality", localityController.viewModifLocality);

router.post ("/login/profile/modifLocality/:locality", multer("localitys"), localityController.modifLocality);

module.exports = router;
