const Product = require('../models/product')
const { responseHandler } = require('../config/ResponseHandler')

//Get Product Id
exports.getProductById = async (req, res, next, id) => {
    try {
        await Product.findById(id).exec((err, product) => {
            if (err) {
                return errorHandle(404, 'Product not found', res)
            }
            req.product = product;
            next();
        })
    } catch (error) {
        console.log(error)
    }
}

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

//Update Increment Product
exports.updateIncProduct = async (req, res) => {
    try {
        await Product.findByIdAndUpdate(req.body.productId).exec((err, product) => {
            if (err) {
                return errorHandle(404, 'Product not update', res)
            }
            req.product = product;
            const quan = req.product.quantity + 1;
            const price = quan * req.body.price;
            const editProduct = req.product;
            editProduct._id = req.body.productId;
            editProduct.quantity = quan;
            editProduct.price = price;
            editProduct.save((err, updateProduct) => {
                if (err) {
                    return errorHandle(404, 'Product data not updated', res)
                }
                return res.send(responseHandler({ updateProduct }))
            });
        });
    } catch (error) {
        console.log(error);
    }
}

//Update Decrement Product
exports.updateDecProduct = async (req, res) => {
    try {
        Product.findByIdAndUpdate(req.body.productId).exec((err, product) => {
            if (err) {
                return errorHandle(404, 'Product not update', res)
            }
            req.product = product;
            const quan = req.product.quantity - 1;
            const price = quan * req.body.price;
            const editProduct = req.product;
            editProduct._id = req.body.productId;
            editProduct.quantity = quan;
            editProduct.price = price;
            editProduct.save((err, updateProduct) => {
                if (err) {
                    return errorHandle(404, 'Product data not updated', res)
                }
                return res.send(responseHandler({ updateProduct }))
            });
        });
    } catch (error) {
        console.log(error);
    }
};

//Get All Product Data
exports.getAllProduct = async (req, res) => {
    try {
        await Product.find().exec((err, product) => {
            if (err) {
                return errorHandle(404, 'Product not found!', res)
            }
            return res.send(responseHandler({ product }))
        })
    } catch (error) {
        console.log(error)
    }
}

//Get Product Data
exports.getProduct = (req, res) => {
    try {
        return res.send(responseHandler(req.product))
    } catch (error) {
        console.log(error)
    }
}