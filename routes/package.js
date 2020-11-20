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

const { createPackage, getAllPackage, getPackageById, getPackage } = require("../controllers/package")

//Parameters of Package
router.param('packageId', getPackageById)

//Create Package Route
router.post("/create/package", upload.single('image'), createPackage)

//Get Package Data
router.get('/get/package/:packageId', getPackage)
router.get('/package/:id', getAllPackage)

module.exports = router
