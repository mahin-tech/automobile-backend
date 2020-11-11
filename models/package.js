const mongoose = require('mongoose')

const packageSchema = new mongoose.Schema({
    packageName: {
        type: String,
        default: null
    },
    image: {
        type: String,
        default: null
    },
    description: {
        type: String,
        default: null
    }
}, { timestamps: true })

module.exports = mongoose.model("Package", packageSchema)