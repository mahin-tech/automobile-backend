const Brand = require('../models/brand')

//Store Brand Data In Brand Collection
exports.createBrand = async (req, res) => {
    try {
        const brand = await new Brand(req.body)
        brand.save((err, brand) => {
            if (err) {
                return res.status(400).json({
                    error: "Brand not able to save"
                })
            }
            return res.json({ brand })
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
                return res.status(400).json({
                    error: "No Brand Found"
                })
            }
            return res.json(brand)
        })
    } catch (error) {
        console.log(error)
    }
}

