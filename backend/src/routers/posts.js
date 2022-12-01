const router = require ("express").Router();
const PostsController = require("../controller/PostsController");
const { Post } = require("../models/");

//create a post
router.post("/", PostsController.createPost);
//update a post
router.put("/:id",PostsController.updatePost);

//delete a post
router.delete("/:id",PostsController.deletePost);

//like a post
router.post("/:id/like", PostsController.likePost);
//get a post

router.get("/:id", PostsController.getPost);

//get timeline posts

router.get("/", PostsController.getTimelinePosts);


module.exports = router;