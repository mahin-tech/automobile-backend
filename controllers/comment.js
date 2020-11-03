const Comment = require('../models/comment')

//Get Comment Id of Tag Controller
exports.getCommentById = async(req, res, next, id) => {
    try{
        await Comment.findById(id).exec((err, comment) => {
            if(err){
                return res.status(400).json({
                    error: "Comment Data Not Found"
                })
            }
            req.comment = comment
            next()
        })
    }catch(error){
        console.log(error)
    }
}

//Store Comment Data In Tag Collection
exports.createComment = async(req, res) => {
    try{
        const comment = await new Comment(req.body)
        comment.save((err, comment) => {
            if(err) {
                return res.status(400).json({
                    error: "Comment not able to save"
                })
            }
            return res.json({comment})
        })
    }catch(error){
        console.log(error)
    }
}

//Get Comment Data 
exports.getComment = (req, res) => {
    try {
        return res.json(req.comment)
    }catch(error){
        console.log(error)
    }
}

//Get All Comment Data
exports.getAllComment = async(req, res) => {
    try {
        await Comment.find().populate('userId').exec((err, comment) => {
            if(err) {
                return res.status(400).json({
                    error: "No Comment Found"
                })
            }
            return res.json(comment)
        })
    } catch (error) {
        console.log(error)
    }
}

//Update Comment Data
exports.updateComment = async(req, res) => {
    try {
        const editComment = await req.comment
        editComment._id = req.body.commentId
        editComment.tagName = req.body.commentName
        editComment.userId = req.body.userId
        editComment.postId = req.body.postId
        editComment.status = req.body.status
        editComment.save((err, comment) => {
            if(err){
                return res.status(400).json({
                    error: "Comment data not updated"
                })
            }
            res.json({comment})
        })
    }catch(error){
        console.log(error)
    }
}

//Delete Comment Data
exports.deleteComment = async(req, res) => {
    try {
        const removeComment = await req.comment
        Comment.deleteOne(removeComment, (err, comment) => {
            if(err){
                return res.status(400).json({
                    error: "No Comment Found"
                })
            }else {
                if(comment.ok === 1){
                    Comment.find().populate('postId userId').exec((err, comment) => {
                        if(err) {
                            return res.status(400).json({
                                error: "No comment Found"
                            })
                        }
                        return res.json(comment)
                    })
                }
            }           
        })
    } catch (error) {
        console.log(error)
    }
}

