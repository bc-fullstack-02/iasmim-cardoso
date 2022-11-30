const router = require("express").Router();
const { User, Profile } = require("../models")
const bcrypt = require("bcrypt");
const user = require("../models/user");
const profile = require("../models/profile");

class SecurityController {
    
    static registerUser = (async (req,res)=>{
        try{
            //genarete new password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            
            
            // create new user
            const newUser = {
                user: req.body.user,
                password: hashedPassword,
            };
            //save user and response
            const savedUser = await new User(newUser).save();
           
            // create a new profile
            const newProfile = {
               name:req.body.name || req.body.user,
               user:savedUser._id
            }
            const savedProfile = await new Profile(newProfile).save();
           
            savedUser.profile = savedProfile._id;
            savedUser.save();

            res.status(200).json(savedProfile);
        }catch(err){
            console.log(err)
            res.status(500).json(err)
        }
    });
    static loginUser = (async(req,res)=>{
        try{    
            const user = await User.findOne({user:req.body.user});
            !user && res.status(404).send("User not found")

            const validPassword = await bcrypt.compare(req.body.password, user.password)
            !validPassword && res.status(400).json("Wrong Password")

            res.status(200).json(user)
        }catch(err){
            res.status(500).json(err)
        }

    });

}
module.exports = SecurityController;

