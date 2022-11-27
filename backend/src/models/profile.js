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
},
{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);