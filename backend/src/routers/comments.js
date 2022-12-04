const router = require("express").Router();
const CommentController = require("../controller/CommentController");

// get comments

router.get("/:id/comments/", CommentController.getPostComments);

//create a comment on the post

router.post("/:id/comments", CommentController.commentPost);

//update a comment

router.put("/:id/comments/:commentId", CommentController.updateComment);

//delete a comment

router.delete("/:id/comments/:commentId", CommentController.deleteComment);

//get a comment of a post by id
router.get("/:id/comments/:commentId", CommentController.getComment);

//like a comment by id

router.post("/:id/comments/:commentId/like", CommentController.likeComment);

module.exports = router;
