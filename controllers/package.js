const Package = require('../models/package')
const { responseHandler } = require('../config/ResponseHandler')

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
        await Package.find().exec((err, package) => {
            if (err) {
                return errorHandle(404, 'Package not found!', res)
            }
            return res.send(responseHandler({ package }))
        })
    } catch (error) {
        console.log(error)
    }
}