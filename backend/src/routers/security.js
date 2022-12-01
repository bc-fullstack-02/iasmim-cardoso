const router = require("express").Router();
const { User } = require("../models"); 
const bcrypt = require("bcrypt");
const SecurityController = require("../controller/SecurityController");

//REGISTER
router
    .post("/register",SecurityController.registerUser);
    //LOGIN
    router.
    post("/login", SecurityController.loginUser);
    
    module.exports = router;