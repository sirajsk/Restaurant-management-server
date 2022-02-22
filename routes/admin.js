const express = require("express");
const router = express.Router();
const adminContolers=require('../controllers/adminControllers')

router.post('/login',adminContolers.login)

module.exports = router;