const Brand = require('../models/brand')
const { responseHandler } = require('../config/ResponseHandler')

//Store Brand Data In Brand Collection
exports.createBrand = async (req, res) => {
    try {
        const brand = await new Brand(req.body)
        brand.branchLogo = req.file.filename
        brand.save((err, brand) => {
            if (err) {
                return errorHandle(404, 'Brand not able to save', res)
            }
            return res.send(responseHandler({ brand }))
        })
    } catch (error) {
        console.log(error)
    }
}

//Get All Brand Data
exports.getAllBrand = async (req, res) => {
    try {
        await Brand.find().exec((err, brand) => {
            if (err) {
                return errorHandle(404, 'Brand not found!', res)
            }
            return res.send(responseHandler({ brand }))
        })
    } catch (error) {
        console.log(error)
    }
}

//Get Search Brand Data
exports.getSearch = async (req, res) => {
    try {
        const data = req.params.search
        if (!data) {
            return res.send(responseHandler(null, true, 'Send search data first!'))
        }
        const brandData = await Brand.find({
            $or: [
                { brandName: { $regex: new RegExp(data, 'i') } },
                { branchName: { $regex: new RegExp(data, 'i') } },
            ],
        }).select('_id brandName branchName branchLogo location locationLink contact')
        return res.send(responseHandler({ brandData }))
    } catch (error) {
        console.log(error)
    }
}