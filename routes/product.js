const express = require('express')
const router = express.Router()

const { createProduct, getAllProduct, getProductById, updateIncProduct, updateDecProduct, getProduct } = require("../controllers/product")

//Parameter of Product
router.param("productId", getProductById)

//Create Product Route
router.post("/create/product", createProduct)

//Update Increment Product
router.put("/edit/inc/product/:productId", updateIncProduct);

//Update Decrement Product
router.put("/edit/dec/product/:productId", updateDecProduct);

//Read Product Route
router.get("/get/product/:productId", getProduct);

//Get Product Data
router.get('/product', getAllProduct)

module.exports = router
