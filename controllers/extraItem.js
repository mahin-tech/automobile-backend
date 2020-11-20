const Item = require('../models/extraItem')
const { responseHandler } = require('../config/ResponseHandler')

// Store Item Data in Database
exports.createItem = async (req, res) => {
    try {
        const item = await new Item(req.body)
        item.save((err, item) => {
            if (err) {
                return errorHandle(404, 'Item not able to save', res)
            }
            return res.send(responseHandler({ item }))
        })
    } catch (error) {
        console.log(error)
    }
}

// Get All Item Data
exports.getAllItem = async (req, res) => {
    try {
        await Item.find().exec((err, item) => {
            if (err) {
                return errorHandle(404, 'Item not found', res)
            }
            return res.send(responseHandler({ item }))
        })
    } catch (error) {
        console.log(error)
    }
}