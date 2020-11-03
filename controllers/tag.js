const Tag = require('../models/tag')

//Get Tag Id of Tag Controller
exports.getTagById = async(req, res, next, id) => {
    try{
        await Tag.findById(id).exec((err, tag) => {
            if(err){
                return res.status(400).json({
                    error: "Tag Data Not Found"
                })
            }
            req.tag = tag
            next()
        })
    }catch(error){
        console.log(error)
    }
}

//Store Tag Data In Tag Collection
exports.createTag = async(req, res) => {
    try{
        const tag = await new Tag(req.body)
        tag.save((err, tag) => {
            if(err) {
                return res.status(400).json({
                    error: "Tag not able to save"
                })
            }
            return res.json({tag})
        })
    }catch(error){
        console.log(error)
    }
}

//Get Tag Data 
exports.getTag = (req, res) => {
    try {
        return res.json(req.tag)
    }catch(error){
        console.log(error)
    }
}

//Get All Tag Data
exports.getAllTag = async(req, res) => {
    try {
        await Tag.find().exec((err, tag) => {
            if(err) {
                return res.status(400).json({
                    error: "No Tag Found"
                })
            }
            return res.json(tag)
        })
    } catch (error) {
        console.log(error)
    }
}

//Update Tag Data
exports.updateTag = async(req, res) => {
    try {
        const editTag = await req.tag
        editTag._id = req.body.tagId
        editTag.tagName = req.body.tagName
        editTag.save((err, tag) => {
            if(err){
                return res.status(400).json({
                    error: "Tag data not updated"
                })
            }
            res.json({tag})
        })
    }catch(error){
        console.log(error)
    }
}

//Delete Tag Data
exports.deleteTag = async(req, res) => {
    try {
        const removeTag = await req.tag
        Tag.deleteOne(removeTag, (err, tag) => {
            if(err){
                return res.status(400).json({
                    error: "No Tag Found"
                })
            }else {
                if(tag.ok === 1){
                    Tag.find().exec((err, tag) => {
                        if(err) {
                            return res.status(400).json({
                                error: "No Tag Found"
                            })
                        }
                        return res.json(tag)
                    })
                }
            }           
        })
    } catch (error) {
        console.log(error)
    }
}

