const {User, Profile} = require("../models");
const router = require("express").Router();
const bcrypt = require("bcrypt")
const UserController = require("../controller/UserController");

//update user
router.put("/:id", UserController.updateUser);

//delete user
router.delete("/:id", async(req,res)=>{
    if(req.body.userId == req.params.id || req.body.isAdmin){
        try{
            const user = await User.findById(req.params.id);

            await User.findByIdAndDelete(req.params.id);
            await Profile.findByIdAndDelete(user.profile);

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
});


module.exports = router;