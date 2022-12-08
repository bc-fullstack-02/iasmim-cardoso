const router = require("express").Router({ mergeParams: true });
const CommentController = require("../controller/CommentController");

// get comments
router.get("/", CommentController.getPostComments);

//create a comment on the post
router.post("/", CommentController.commentPost);

//update a comment
router.put("/:commentId", CommentController.updateComment);

//delete a comment
router.delete("/:commentId", CommentController.deleteComment);

//get a comment of a post by id
router.get("/:commentId", CommentController.getComment);

//like a comment by id
router.post("/:commentId/like", CommentController.likeComment);

module.exports = router;
