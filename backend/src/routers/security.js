const router = require("express").Router();
const { User } = require("../models"); 
const bcrypt = require("bcrypt");
const SecurityController = require("../controller/SecurityController");

//REGISTER
router
    .post("/register",SecurityController.registerUser);
    //LOGIN
    router.
    post("/login", SecurityController.loginUser);
       // UPDATE USER WITH PROFILE

    //     router.put("/:id", async(req,res)=>{
    //         if(req.body.profileId == req.params.id || req.body.isAdmin){
    //                 try{
    //                     const salt = await bcrypt.genSalt(10);
    //                     req.body.password = await bcrypt.hash(req.body.password, salt);
    //                 }catch(err){
    //                     return res.status(500).json(err);
    //                 }
    //             try{
    //                 const profile = await User.findByIdAndUpdate(req.params.id,{
    //                     $set: req.body,
    //                 });
    //                 res.status(200).json("account updated")
    //             }catch(err){
    //                 return res.status(500).json(err);
    //             }
    //         }else{
    //             return res.status(403).json("cant update")
    //         }
    //     });


    
    module.exports = router;