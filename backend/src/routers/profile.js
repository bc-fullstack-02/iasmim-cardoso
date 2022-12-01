const router = require("express").Router();
const { Profile } = require("../models/profile");
const ProfileController = require("../controller/ProfileController");
//get/profiles
router.get("/", ProfileController.getProfiles);
// search by name
router.get("/search", ProfileController.searchProfile);
// get by id
router.get("/:id", ProfileController.getProfilesById);
//follow a user
router.post("/:id/follow", ProfileController.folowProfile);


module.exports = router;
