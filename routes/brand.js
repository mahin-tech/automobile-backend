const express = require('express')
const router = express.Router()

const { createBrand, getAllBrand } = require("../controllers/brand")

//Create Brand Route
router.post("/create/brand", createBrand)

//Get Brand Data
router.get('/brand', getAllBrand)

module.exports = router
