const Item = require('../models/extraItem')

// Store Item Data in Database
exports.createItem = async (req, res) => {
    try {
        const item = await new Item(req.body)
        item.save((err, item) => {
            if (err) {
                return res.status(400).json({
                    error: "Item not able to save"
                })
            }
            return res.json({ item })
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
                return res.status(400).json({
                    error: "Item data not found"
                })
            }
            return res.json({ item })
        })
    } catch (error) {
        console.log(error)
    }
}