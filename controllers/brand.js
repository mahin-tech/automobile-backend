const Brand = require('../models/brand')

//Store Brand Data In Brand Collection
exports.createBrand = async (req, res) => {
    try {
        const brand = await new Brand(req.body)
        brand.branchLogo = req.file.filename
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

//Get Search Brand Data
exports.getSearch = async (req, res) => {
    try {
        const data = req.params.search
        if (!data) {
            return res.send('Send search data first!')
        }
        const brandData = await Brand.find({
            $or: [
                { brandName: { $regex: new RegExp(data, 'i') } },
                { branchName: { $regex: new RegExp(data, 'i') } },
            ],
        }).select('_id brandName branchName branchLogo location locationLink contact')
        return res.send({ brandData })
    } catch (error) {
        console.log(error)
    }
}


//Test Data
exports.getTestData = (req, res) => {
    try {
        return res.send('hello')
    } catch (error) {

    }
}