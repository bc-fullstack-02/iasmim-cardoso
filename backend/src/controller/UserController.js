const router = require("express").Router();
const { User, Profile } = require("../models")
const bcrypt = require("bcrypt");
const user = require("../models/user");
const profile = require("../models/profile");

class UserController {
    
    static updateUser = (async(req,res)=>{
        if(req.body.userId == req.params.id || req.body.isAdmin){
            if(req.body.password){
                try{
                    const salt = await bcrypt.genSalt(10);
                    req.body.password = await bcrypt.hash(req.body.password, salt);
                }catch(err){
                    console.log(err)
                    return res.status(500).json(err);
                }
            }
            try{
                const user = await User.findByIdAndUpdate(req.params.id,{
                    $set: req.body,
                });
                res.status(200).json("account updated")
            }catch(err){
                console.log(err)
                return res.status(500).json(err);
            }
        }else{
            console.log(err)
            return res.status(403).json("cant update")
        }
    });

}

module.exports = UserController;