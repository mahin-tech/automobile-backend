const mongoose = require('mongoose')
const User = require('./user')
const { ObjectId } = mongoose.Schema

const discussionSchema = new mongoose.Schema({
    title:{
        type: String,
        default: null
    },
    content:{
        type: String,
        default: null
    },
    lastPost:{
        type: Date,
        default: null
    },
    lastPostBy:{
        type: ObjectId,
        ref: User,
        default: null
    },
    status:{
        type: String,
        default: "open",
        enum: [ "open", "close" ]
    },
},{timestamps: true})

module.exports = mongoose.model("Discussion", discussionSchema)