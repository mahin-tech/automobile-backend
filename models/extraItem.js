const mongoose = require('mongoose')

const extraItemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        default: null
    },
    price: {
        type: String,
        default: null
    }
}, { timestamps: true })

module.exports = mongoose.model("Item", extraItemSchema)