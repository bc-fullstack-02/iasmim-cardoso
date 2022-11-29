const router = require ("express").Router();
const { Post, User } = require("../models/");



//create a post
router.post("/",async (req,res)=>{
    const newPost = req.body
    try{
        const savedPost = await Post.create(newPost);
        res.status(200).json(savedPost)
    }catch(err){    
        console.log(err)
        res.status(500).json(err)
    }

});
//update a post
router.put("/:id",async (req,res)=>{
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

//delete a post
router.delete("/:id",async (req,res)=>{
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

//like a post
router.put("/:id/like", async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes:req.body.userId}});
            res.status(200).json({message: "post has been liked"});
        }else{
            await post.updateOne({$pull:{likes:req.body.userId}});
            res.status(200).json({message: "post has been disliked"});
        }
    }catch(err){
        res.status(500).json(err);
    }
});
//get a post

router.get("/:id", async (req,res) => {
    try{
        const post = await Post.findById(req,params.id);
        res.status(200).json(post);
    }catch(err){
        res.status(500).json(err)

    }
})

//get timeline posts

router.get("/timeline", async(req,res)=>{
    let postArray = [];
    try{
        const currentUser = await User.findById(req.body.userId);
        const userPosts = await Post.find({userId:currentUser._id})
    }catch(err){
    res.status(500).json(err)
    }
});

module.exports = router;