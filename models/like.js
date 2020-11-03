const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
const User = require('./user')
const Post = require('./post')

const likeSchema = new mongoose.Schema({
    like:{
        type: Boolean,
        default: "false",
        enum: [ "true", "false" ]
    },
    userId:{
        type: ObjectId,
        ref: User
    },
    postId:{
        type: ObjectId,
        ref: Post
    }
},{timestamps: true})

module.exports = mongoose.model("Like", likeSchema)