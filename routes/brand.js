const express = require('express')
const router = express.Router()
const multer = require('multer')

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/upload')
    },
    filename: (req, file, cb) => {
        let filetype = ''
        if (file.mimetype === 'image/gif') {
            filetype = 'gif'
        }
        if (file.mimetype === 'image/png') {
            filetype = 'png'
        }
        if (file.mimetype === 'image/jpeg') {
            filetype = 'jpg'
        }
        cb(null, 'image-' + Date.now() + '.' + filetype)
    }
})

let upload = multer({ storage: storage })

const { createBrand, getAllBrand, getSearch } = require("../controllers/brand")

//Create Brand Route
router.post("/create/brand", upload.single('branchLogo'), createBrand)

//Get Brand Data
router.get('/brand', getAllBrand)
router.get('/search', getSearch)

module.exports = router
