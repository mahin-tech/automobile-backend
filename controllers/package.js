const Package = require('../models/package')
const { responseHandler } = require('../config/ResponseHandler')
const mongoose = require('mongoose')

//Get Package Id
exports.getPackageById = async (req, res, next, id) => {
    try {
        await Package.findById(id).exec((err, package) => {
            if (err) {
                return errorHandle(404, 'Package not found', res)
            }
            req.package = package;
            next();
        })
    } catch (error) {
        console.log(error)
    }
}

//Store Package Data In Package Collection
exports.createPackage = async (req, res) => {
    try {
        const package = await new Package(req.body)
        package.image = req.file.filename
        package.save((err, package) => {
            if (err) {
                return errorHandle(404, 'Package not able to save', res)
            }
            return res.send(responseHandler({ package }))
        })
    } catch (error) {
        console.log(error)
    }
}

//Get All Package Data
exports.getAllPackage = async (req, res) => {
    try {
        await Package.aggregate([
            {
                $match: {
                    'brandId': {
                        $in: [
                            mongoose.Types.ObjectId(req.params.id)
                        ]
                    }
                }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "productId",
                    foreignField: "_id",
                    as: "productDetails"
                },
            },
            {
                $lookup: {
                    from: "items",
                    localField: "extraItem",
                    foreignField: "_id",
                    as: "extraItemDetails"
                },
            }
        ]).exec((err, package) => {
            if (err) {
                return errorHandle(404, 'Package not found!', res)
            }
            return res.send(responseHandler({ package }))
        })
    } catch (error) {
        console.log(error)
    }
}

//Get Package Data
exports.getPackage = (req, res) => {
    try {
        return res.send(responseHandler(req.package))
    } catch (error) {
        console.log(error)
    }
}