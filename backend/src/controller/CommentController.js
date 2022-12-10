const { Post, Comments } = require("../models");

class CommentController {
    //post a comment on the post

    static commentPost = (async (req, res) => {
        const newComment = req.body
        newComment.post = req.params.id
        newComment.profile = req.user.profile._id;
        try {
            const savedComment = await Comments.create(newComment);
            const currentPost = await Post.findById(savedComment.post);
            await currentPost.updateOne({ $push: { comments: savedComment._id } });
            req.publish('comment', [currentPost.profile], currentPost);
            res.status(201).json(savedComment)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    });

    //get comments of the post

    static getPostComments = (async (req, res) => {
        try {
            const post = await Post.findById(req.params.id).populate("comments");
            res.status(200).json(post.comments);
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    });

    //get a comment of a post by id

    static getComment = (async (req, res) => {
        try {
            const comment = await Comments.findById(req.params.commentId);
            if (!comment) {
                return res.status(404).json({ message: "Comment not found" });
            }
            res.status(200).json(comment);
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    });
    //put a comment on a post by id

    static updateComment = (async (req, res) => {
        try {
            const comment = await Comments.findById(req.params.commentId);
            if (comment) {
                await comment.updateOne({ $set: req.body });
                res.status(200).json({ message: "the comment has been updated" })
            } else {
                res.status(403).json({ message: "you can update only tour comment" })
            }
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }

    });
    //delete a comment by id
    static deleteComment = (async (req, res) => {
        try {
            const comment = await Comments.findById(req.params.commentId);
            if (comment) {
                await Post.findByIdAndUpdate({ _id: comment.post }, { $pull: { comments: comment._id } });
                await comment.deleteOne();
                res.status(200).json({ message: "the comment has been deleted" })
            } else {
                res.status(403).json({ message: "you can delete only your comment" })
            }
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }

    });

    //like a comment by id

    static likeComment = (async (req, res) => {
        try {
            const comment = await Comments.findById(req.params.commentId);
            if (!comment.likes.includes(req.user.profile._id)) {
                await comment.updateOne({ $push: { likes: req.user.profile._id } });
                req.publish('comment-like', [comment.profile], comment);
                res.status(200).json({ message: "comment has been liked" });
            } else {
                await comment.updateOne({ $pull: { likes: req.user.profile._id } });
                res.status(200).json({ message: "comment has been disliked" });
            }
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    });


}

module.exports = CommentController;