const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
const User = require('./user')
const Post = require('./post')

const commentSchema = new mongoose.Schema({
    commentName:{
        type: String,
        default: null
    },
    userId:{
        type: ObjectId,
        ref: User
    },
    postId:{
        type: ObjectId,
        ref: Post
    },
    status:{
        type: Boolean,
        default: true
    }
},{timestamps: true})

module.exports = mongoose.model("Comment", commentSchema)