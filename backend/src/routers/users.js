const router = require("express").Router();
const UserController = require("../controller/UserController");

//update user
router.put("/me", UserController.updateUser);

//delete user
router.delete("/me", UserController.deleteUser);

//get all users
router.get("/me", UserController.getUsers);


module.exports = router;