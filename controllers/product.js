const Product = require('../models/product')
const { responseHandler } = require('../config/ResponseHandler')

//Store Product Data In Product Collection
exports.createProduct = async (req, res) => {
    try {
        const product = await new Product(req.body)
        product.save((err, product) => {
            if (err) {
                return errorHandle(404, 'Product not able to save', res)
            }
            return res.send(responseHandler({ product }))
        })
    } catch (error) {
        console.log(error)
    }
}

//Get All Product Data
exports.getAllProduct = async (req, res) => {
    try {
        await Product.find().populate("packageId brandId").exec((err, product) => {
            if (err) {
                return errorHandle(404, 'Product not found!', res)
            }
            return res.send(responseHandler({ product }))
        })
    } catch (error) {
        console.log(error)
    }
}