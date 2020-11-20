const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
const Product = require('./product')
const Brand = require('./brand')
const Item = require('./extraItem')

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
    },
    productId: {
        type: [ObjectId],
        ref: Product,
        default: null
    },
    brandId: {
        type: ObjectId,
        ref: Brand,
        default: null
    },
    extraItem: {
        type: [ObjectId],
        ref: Item,
        default: null
    }
}, { timestamps: true })

module.exports = mongoose.model("Package", packageSchema)