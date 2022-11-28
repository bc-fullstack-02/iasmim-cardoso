const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    followers: {
        type:Array,
        defalt:[]
    },
    following: {
        type:Array,
        defalt:[]
    },
    bio:{
        type: String,
        max: 50
    },
    city:{
        type: String,
        max: 50
    }
},
{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);