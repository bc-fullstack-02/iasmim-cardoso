const { Post } = require ("../models");

class FeedController {
    static getFeed = (async (req, res) => {
        try {
          const posts = await Post.find({ profile: { $in: req.user.profile.following } }).sort({_id: -1}).populate("profile");
            res.status(200).json(posts);
        }catch (err){
            res.status(500).json(err);
        }
    });
}

module.exports = FeedController;