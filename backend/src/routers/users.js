const {User} = require("../models");
const router = require("express").Router();
const bcrypt = require("bcrypt")
//update user
router.put("/:id", async(req,res)=>{
    if(req.body.userId == req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }catch(err){
                return res.status(500).json(err);
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id,{
                $set: req.body,
            });
            res.status(200).json("account updated")
        }catch(err){
            return res.status(500).json(err);
        }
    }else{
        return res.status(403).json("cant update")
    }
});

//delete user
router.delete("/:id", async(req,res)=>{
    if(req.body.userId == req.params.id || req.body.isAdmin){
        try{
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "Account deleted"});
        }catch(err){
            console.log(err)
            return res.status(500).json(err);

        }
    }else{
        return res.status(403).json({ message: "You can delet only your account"})
    }
});
//get all users
router.get("/:id", async(req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        const {password,updatedAt, ...other} = user._doc
        res.status(200).json(other)
    }catch(err){
        res.status(500).json(err)
    }
})


module.exports = router;