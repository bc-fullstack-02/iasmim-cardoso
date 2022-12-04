const router = require ("express").Router();
const CommentController = require("../controller/CommentController");

 //post a comment on the post

 router.post("/:id/comments", CommentController.commentPost);

  //like a comment by id

  router.post("/:id/comments/:commentId/like", CommentController.likeComment);

  // get posts

  router.get("/:id/comments/", CommentController.getPostComments);


 module.exports = router;