const router = require("express").Router();
const SecurityController = require("../controller/SecurityController");

//REGISTER
router.post("/register", SecurityController.registerUser);
//LOGIN
router.post("/login", SecurityController.loginUser);

module.exports = router;