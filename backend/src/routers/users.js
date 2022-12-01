const {User, Profile} = require("../models");
const router = require("express").Router();
const bcrypt = require("bcrypt")
const UserController = require("../controller/UserController");

//update user
router.put("/:id", UserController.updateUser);

//delete user
router.delete("/:id",UserController.deleteUser);

//get all users
router.get("/:id",UserController.getUsers);


module.exports = router;