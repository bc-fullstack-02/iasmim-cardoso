const router = require("express").Router();
const { CommentsRouter } = require(".");
const PostsController = require("../controller/PostsController");

//get timeline posts
router.get("/", PostsController.getTimelinePosts);
//create a post
router.post("/", PostsController.createPost);
//update a post
router.put("/:id", PostsController.updatePost);
//delete a post
router.delete("/:id", PostsController.deletePost);
//get a post
router.get("/:id", PostsController.getPost);
//like a post
router.post("/:id/like", PostsController.likePost);



router.use('/:id/comments', CommentsRouter);

module.exports = router;