// const router = require ("express").Router();
// const { Post } = require("../models/profile");
// router.get("/", (req, res) => {
//     const name = req.query.name;
//     const users = [];
//     if(name) {
//      users = User.find({ 'name': name });
//     } else {
//      users = User.find({}); 
//     }
 
//     res.status(200).json(users);
//  })

//follow a user

// router.put("/:id/follow", async(req,res) => {
//     if(req.body.userId !== req.params.id){
//         try{
//             const user = await User.findById(req.params.id);
//             const currentUser = await User.findById(req.body.userId);
//             if(!user.followers.includes(req.body.userId)){
//                 await user.updateOne({$push:{followers:req.body.userId}});
//                 await currentUser.updateOne({$push:{following:req.body.userId}});
//                 res.status(200).json("user has been followes");
//             }else{
//                 res.status(403).json("you allredy follow this user")
//             }

//         }catch(err){
//             res.status(500).json(err)
//         }
//     }else{
//         res.status(403).json({message: "you cant follow yourself"})
//     }
// });

// module.exports = router;