const { Schema, model} = require("mongoose");

const commentsSchema = new Schema({
    description:{
        type: String,
        required: true,
        minLength: 2
    },
    profile:{
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    },
    post:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Posts'
    },
    likes:[{
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    }]
})

module.exports = model('Comments', commentsSchema)