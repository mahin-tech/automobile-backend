const mongoose = require('mongoose')

const brandSchema = new mongoose.Schema({
    brandName: {
        type: String,
        default: null
    },
    branchName: {
        type: String,
        default: null
    },
    branchLogo: {
        type: String,
        default: null
    },
    location: {
        type: String,
        default: null
    },
}, { timestamps: true })

module.exports = mongoose.model("Brand", brandSchema)