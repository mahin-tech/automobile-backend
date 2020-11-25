const Product = require('../models/product')

//Get Product Id
exports.getProductById = async (req, res, next, id) => {
    try {
        await Product.findById(id).exec((err, product) => {
            if (err) {
                return res.status(400).json({
                    error: "Product data not found"
                })
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
                return res.status(400).json({
                    error: "Product not able to save"
                })
            }
            return res.json({ product })
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
                return res.status(400).json({
                    error: "Product not update"
                })
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
                    return res.status(400).json({
                        error: "Product data not updated"
                    })
                }
                return res.json({ updateProduct })
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
                return res.status(400).json({
                    error: "Product data not updated"
                })
            }
            req.product = product;
            const quan = req.product.quantity - 1;
            const price = req.product.price;
            const editProduct = req.product;
            editProduct._id = req.body.productId;
            editProduct.quantity = quan;
            editProduct.price = price;
            editProduct.save((err, updateProduct) => {
                if (err) {
                    return res.status(400).json({
                        error: "Product data not updated"
                    })
                }
                return res.json({ updateProduct })
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
                return res.status(400).json({
                    error: "Product data not found"
                })
            }
            return res.json({ product })
        })
    } catch (error) {
        console.log(error)
    }
}

//Get Product Data
exports.getProduct = (req, res) => {
    try {
        return res.json(req.product)
    } catch (error) {
        console.log(error)
    }
}