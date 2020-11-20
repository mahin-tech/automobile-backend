const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        default: null
    },
    price: {
        type: String,
        default: null
    },
    quantity: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

module.exports = mongoose.model("Product", productSchema)