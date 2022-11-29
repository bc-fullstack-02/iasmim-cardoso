const router = require("express").Router();
const { User, Profile } = require("../models/")
const bcrypt = require("bcrypt")

//REGISTER
router.post("/register", async (req,res)=>{
 
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

            const user = await User.create(newUser);
            res.status(200).json(user);
        }catch(err){
            console.log(err);
        }
    });

            
    //LOGIN
    router.post("/login", async(req,res)=>{
        try{    
            const user = await User.findOne({user:req.body.user});
            !user && res.status(404).send("User not found")

            const validPassword = await bcrypt.compare(req.body.password, user.password)
            !validPassword && res.status(400).json("Wrong Password")

            res.status(200).json(user)
        }catch(err){
            res.status(500).json(err)
        }

        //PUT USER ON PROFILE
        router.put("/", async(req,res)=>{
            const newProfile = req.body.userId
            try{
                const saveProfile = await Profile.create(newProfile);
                res.status(200).json(saveProfile)
            }catch(err){
                console.log(err)
                res.status(500).json(err)
            }
        });


        //UPDATE USER WITH PROFILE

        router.put("/:id", async(req,res)=>{
            if(req.body.profileId == req.params.id || req.body.isAdmin){
                    try{
                        const salt = await bcrypt.genSalt(10);
                        req.body.password = await bcrypt.hash(req.body.password, salt);
                    }catch(err){
                        return res.status(500).json(err);
                    }
                try{
                    const profile = await User.findByIdAndUpdate(req.params.id,{
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

    });

module.exports = router;
    
    