const router = require("express").Router();
const ProfileController = require("../controller/ProfileController");
//get/profiles
router.get("/", ProfileController.getProfiles);
// search by name
router.get("/search", ProfileController.searchProfile);
//follow a user
router.post("/:id/follow", ProfileController.followProfile);
//unfollow a user
router.post("/:id/follow", ProfileController.followProfile);

module.exports = router;
