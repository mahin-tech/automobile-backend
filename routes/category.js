const express = require('express')
const router = express.Router()

const { createCategory, getCategory, getAllCategory, getCategoryById, updateCategory, deleteCategory } = require("../controllers/category")

//Parameter of Category
router.param("categoryId", getCategoryById)

//Create Category Route
router.post("/create/category", createCategory)

//Get Category Data
router.get('/get/category/:categoryId', getCategory)
router.get('/category', getAllCategory)

//Update Category Data
router.put('/edit/category/:categoryId', updateCategory)

//Delete Category Data
router.delete('/delete/category/:categoryId', deleteCategory)

module.exports = router
