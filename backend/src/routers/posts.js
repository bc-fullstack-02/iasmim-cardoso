const router = require("express").Router();
const { CommentsRouter } = require(".");
const PostsController = require("../controller/PostsController");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `uploads/`);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });

//get timeline posts
router.get("/", PostsController.getTimelinePosts);
//create a post
router.post("/", upload.single('file'), PostsController.createPost);
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