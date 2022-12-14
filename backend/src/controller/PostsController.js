const { Post } = require("../models");
const multer = require('multer');
const parser = multer({ dest: 'uploads/' });

class PostsController {

    static createPost = (async (req, res) => {
        const newPost = req.body
        console.log(req.body)
            parser.single('picture')(req, res, err => {
                if (err)
                    res.status(500).json({ error: 1, payload: err });
                else {
                    const image = {};
                    image.id = req.file.filename;
                    image.url = `/uploads/${image.id}`;
                    newPost.image = image;
                }
            });
        newPost.profile = req.user.profile._id;
        newPost.comments = [];
        
        try {
            console.log(newPost)
            const savedPost = await Post.create(newPost);
            // req.publish('post', req.user.profile.followers, savedPost);
            
            res.status(201).json(savedPost);
            
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
            
        }
    });

    static updatePost = (async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            if (post) {
                await post.updateOne({ $set: req.body });
                res.status(200).json({ message: "the post has been updated" })
            } else {
                res.status(403).json({ message: "you can update only tour post" })
            }
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }

    });
    static deletePost = (async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            if (post) {
                await post.deleteOne();
                res.status(200).json({ message: "the post has been deleted" })
            } else {
                res.status(403).json({ message: "you can delete only tour post" })
            }
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }

    });

    static likePost = (async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            if (!post.likes.includes(req.user.profile._id)) {
                await post.updateOne({ $push: { likes: req.user.profile._id } });
                // req.publish('post-like', [post.profile], post);
                res.status(200).json({ message: "post has been liked" });
            } else {
                await post.updateOne({ $pull: { likes: req.user.profile._id } });
                res.status(200).json({ message: "post has been disliked" });
            }
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    });

    static getPost = (async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            res.status(200).json(post);
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    });


    static getTimelinePosts = (async (req, res) => {
        try {
            const userPosts = await Post.find({ profile: req.user.profile._id })
            res.status(200).json(userPosts);
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    });


}
module.exports = PostsController;