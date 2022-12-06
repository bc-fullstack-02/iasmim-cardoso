const router = require("express").Router();
const UserController = require("../controller/UserController");

//update user
router.put("/:id", UserController.updateUser);

//delete user
router.delete("/:id", UserController.deleteUser);

//get all users
router.get("/:id", UserController.getUsers);


module.exports = router;