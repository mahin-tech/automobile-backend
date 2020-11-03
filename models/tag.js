const mongoose = require('mongoose')

const tagSchema = new mongoose.Schema({
    tagName:{
        type: Array,
        default: null
    }
},{timestamps: true})

module.exports = mongoose.model("Tag", tagSchema)