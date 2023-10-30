const express = require('express');
const router = express.Router();
const experienceController = require("../controllers/experienceController");
const multer = require("../middlewares/multer")


router.get("/:experience", experienceController.viewExperience);

router.get("/createExperience/:locality", experienceController.viewCreateExperience);

router.post("/createExperience/:locality", multer("experiences"), experienceController.createExperience);

router.get("/deleteExperience/:locality/:experience", experienceController.deleteExperience);

router.get ("/modifExperience/:locality/:experience", experienceController.viewModifExperience);

router.post ("/modifExperience/:locality/:experience", multer("experiences"), experienceController.modifExperience);

module.exports = router;