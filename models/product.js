const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
const Package = require('./package')
const Brand = require('./brand')

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
    },
    packageId: {
        type: ObjectId,
        ref: Package,
        default: null
    },
    brandId: {
        type: ObjectId,
        ref: Brand,
        default: null
    },
    items: {
        type: Boolean,
        default: "false",
        enum: ["true", "false"]
    }
}, { timestamps: true })

module.exports = mongoose.model("Product", productSchema)