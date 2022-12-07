const { Profile } = require("../models");

class ProfileController {
  //get/profiles
  static getProfiles = async (req, res) => {
    try {
      const profiles = await Profile.find({});
      res.status(200).json(profiles);
    } catch (err) {
      console.log(err);
      res.status.json({ error: err });
    }
  };

  //search by name
  static searchProfile = async (req, res) => {
    try {
      const profileSearch = await Profile.find(
        { $text: { $search: `${req.query.q}` } },
        { score: { $meta: "textScore" } }
      ).sort({ score: { $meta: "textScore" } });
      res.status(200).json(profileSearch);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  };

  //follow a user
  static followProfile = async (req, res) => {
    if (req.user.profile._id !== req.params.id) {
      try {
        const profileToBeFollowed = await Profile.findById(req.params.id);
        const currentProfile = await Profile.findById(req.user.profile._id);
        if (!profileToBeFollowed.followers.includes(req.user.profile._id)) {
          await profileToBeFollowed.updateOne({
            $push: { followers: currentProfile._id },
          });
          await currentProfile.updateOne({
            $push: { following: profileToBeFollowed._id },
          });
          res.status(200).json({ message: "user has been followed" });
        } else {
          res.status(400).json({ message: "you allredy follow this user" });
        }
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    } else {
      res.status(400).json({ message: "you cant follow yourself" });
    }
  };

  //unfollow a user
  static unfollowProfile = async (req, res) => {
    if (req.user.profile._id !== req.params.id) {
      try {
        const profileToBeFollowed = await Profile.findById(req.params.id);
        const currentProfile = await Profile.findById(req.user.profile._id);
        if (!profileToBeFollowed.followers.includes(req.user.profile._id)) {
          await profileToBeFollowed.updateOne({
            $pull: { followers: currentProfile._id },
          });
          await currentProfile.updateOne({
            $pull: { following: profileToBeFollowed._id },
          });
          res.status(200).json({ message: "user has been unfollowed" });
        } else {
          res.status(400).json({ message: "you allredy unfollow this user" });
        }
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    } else {
      res.status(400).json({ message: "you cant follow yourself" });
    }
  };
}

module.exports = ProfileController;