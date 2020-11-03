const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        default: null
    }
},{timestamps: true})

module.exports = mongoose.model("Category", categorySchema)