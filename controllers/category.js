const Category = require('../models/category')

//Get Category Id of Category Controller
exports.getCategoryById = async(req, res, next, id) => {
    try{
        await Category.findById(id).exec((err, category) => {
            if(err){
                return res.status(400).json({
                    error: "Category Data Not Found"
                })
            }
            req.category = category
            next()
        })
    }catch(error){
        console.log(error)
    }
}

//Store Category Data In Category Collection
exports.createCategory = async(req, res) => {
    try{
        const category = await new Category(req.body)
        category.save((err, category) => {
            if(err) {
                return res.status(400).json({
                    error: "Category not able to save"
                })
            }
            return res.json({category})
        })
    }catch(error){
        console.log(error)
    }
}

//Get Category Data 
exports.getCategory = (req, res) => {
    try {
        return res.json(req.category)
    }catch(error){
        console.log(error)
    }
}

//Get All Category Data
exports.getAllCategory = async(req, res) => {
    try {
        await Category.find().exec((err, category) => {
            if(err) {
                return res.status(400).json({
                    error: "No Category Found"
                })
            }
            return res.json(category)
        })
    } catch (error) {
        console.log(error)
    }
}

//Update Category Data
exports.updateCategory = async(req, res) => {
    try {
        const editCategory = await req.category
        editCategory._id = req.body.categoryId
        editCategory.categoryName = req.body.categoryName
        editCategory.save((err, category) => {
            if(err){
                return res.status(400).json({
                    error: "Category data not updated"
                })
            }
            res.json({category})
        })
    }catch(error){
        console.log(error)
    }
}

//Delete Category Data
exports.deleteCategory = async(req, res) => {
    try {
        const removeCategory = await req.category
        Category.deleteOne(removeCategory, (err, category) => {
            if(err){
                return res.status(400).json({
                    error: "No Category Found"
                })
            }else {
                if(category.ok === 1){
                    Category.find().exec((err, category) => {
                        if(err) {
                            return res.status(400).json({
                                error: "No Category Found"
                            })
                        }
                        return res.json(category)
                    })
                }
            }           
        })
    } catch (error) {
        console.log(error)
    }
}