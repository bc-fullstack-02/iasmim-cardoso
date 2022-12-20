const { Schema, model} = require("mongoose");

const postsSchema = new Schema({
    title:{
        type: String,
        required: true,
        minLength: 2
    },
    description:{
        type : String,
        required: true,
        minLength: 2
    },
    pictureUrl: {
        type: String,
    },
    hasImage: {
        type: Boolean,
        default: false
    },
    profile:{
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comments'
    }],
    likes:[{
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    }]
})

module.exports = model('Posts', postsSchema)