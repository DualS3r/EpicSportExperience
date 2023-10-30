const express = require('express');
const router = express.Router();
const HomeController = require("../controllers/homeController");
const homeController = require('../controllers/homeController');

router.get('/', homeController.viewHome);

module.exports = router;
