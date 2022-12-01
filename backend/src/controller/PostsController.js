const router = require("express").Router();
const { Post, Profile } = require("../models")
const profile = require("../models/profile");
const posts = require("../models/posts");


class PostsController {

    static createPost = (async (req,res)=>{
        const newPost = req.body
        newPost.profile = req.headers.profile
        try{
            const savedPost = await Post.create(newPost);
            
            res.status(200).json(savedPost)
        }catch(err){    
            console.log(err)
            res.status(500).json(err)
        }

    });

    static updatePost = (async (req,res)=>{
        try{
        const post = await Post.findById(req.params.id);
        if(post){
            await post.updateOne({$set:req.body});
            res.status(200).json({message: "the post has been updated"})
        }else{
            res.status(403).json({message: "you can update only tour post"})
        }
        }catch(err){
            console.log(err)
            res.status(500).json(err)
        }
    
    });
    static deletePost = (async (req,res)=>{
        try{
        const post = await Post.findById(req.params.id);
        if(post){
            await post.deleteOne();
            res.status(200).json({message: "the post has been deleted"})
        }else{
            res.status(403).json({message: "you can delete only tour post"})
        }
        }catch(err){
            console.log(err)
            res.status(500).json(err)
        }
    
    });

    static likePost = (async (req,res)=>{
        try{
            const post = await Post.findById(req.params.id);
            if(!post.likes.includes(req.headers.profile)){
                await post.updateOne({$push:{likes:req.headers.profile}});
                res.status(200).json({message: "post has been liked"});
            }else{
                await post.updateOne({$pull:{likes:req.headers.profile}});
                res.status(200).json({message: "post has been disliked"});
            }
        }catch(err){
            res.status(500).json(err);
        }
    });

    static getPost = (async (req,res) => {
        try{
            const post = await Post.findById(req.params.id);
            res.status(200).json(post);
        }catch(err){
            console.log(err)
            res.status(500).json(err)
        }
    });


    static getTimelinePosts = (async(req,res)=>{
        let postArray = [];
        try{
            const currentProfile = await Profile.findById(req.headers.profile);
            const userPosts = await Post.find({profile:currentProfile._id})
            res.status(200).json(userPosts);
        }catch(err){
            console.log(err)
        res.status(500).json(err)
        }
    });


}
module.exports = PostsController;