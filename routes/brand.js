const express = require('express')
const router = express.Router()

const { createBrand, getAllBrand, getSearch } = require("../controllers/brand")

//Create Brand Route
router.post("/create/brand", createBrand)

//Get Brand Data
router.get('/brand', getAllBrand)
router.get('/search', getSearch)

module.exports = router
