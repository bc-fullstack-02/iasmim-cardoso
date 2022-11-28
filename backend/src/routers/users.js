const {User} = require("../models");
const router = require("express").Router();

//get all users
router.get("/", (req, res) => {
   const name = req.query.name;
   const users = [];
   if(name) {
    users = User.find({ 'name': name });
   } else {
    users = User.find({}); 
   }

   res.status(200).json(users);
})
//delete user

//get user

//follow a user

//unfollow user

module.exports = router;