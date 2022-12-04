const router = require("express").Router();
const { Post, Comments} = require("../models")
const posts = require("../models/posts");
const comments = require("../models/comments");


class CommentController {
    
    //get comments of the post

    
    //post a comment on the post
    
    static commentPost = (async (req,res) => {
        const newComment = req.body
        newComment.post = req.params.id
        newComment.profile = req.headers.profile
        console.log(newComment)
        try{
            const savedComment = await Comments.create(newComment);
            const currentPost = await Post.findById(savedComment.post);
            await currentPost.updateOne({$push:{comments:savedComment._id}});
            res.status(200).json(savedComment)
        }catch(err){
            console.log(err)
            res.status(500).json(err)
        }
    });

    //get a comment of a post by id
    
    //put a comment on a post by id

    //delete a comment by id

    //like a comment by id

    static likeComment = (async (req,res)=>{
        try{
            const comment = await Comments.findById(req.params.commentId);
            if(!comment.likes.includes(req.headers.posts)){
                await comment.updateOne({$push:{likes:req.headers.profile}});
                res.status(200).json({message: "comment has been liked"});
            }else{
                await comment.updateOne({$pull:{likes:req.headers.profile}});
                res.status(200).json({message: "comment has been disliked"});
            }
        }catch(err){
            console.log(err)
            res.status(500).json(err);
        }
    });


}    
module.exports = CommentController;
