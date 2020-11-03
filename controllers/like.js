const Like = require('../models/like')

//Get Like Id of Tag Controller
exports.getLikeById = async(req, res, next, id) => {
    try{
        await Like.findById(id).exec((err, like) => {
            if(err){
                return res.status(400).json({
                    error: "Like Data Not Found"
                })
            }
            req.like = like
            next()
        })
    }catch(error){
        console.log(error)
    }
}

//Store Like Data In Tag Collection
exports.createLike = async(req, res) => {
    try{
        const like = await new Like(req.body)
        like.save((err, like) => {
            if(err) {
                return res.status(400).json({
                    error: "Like not able to save"
                })
            }
            return res.json({like})
        })
    }catch(error){
        console.log(error)
    }
}

//Get Like Data 
exports.getLike = (req, res) => {
    try {
        return res.json(req.like)
    }catch(error){
        console.log(error)
    }
}

//Get All Like Data
exports.getAllLike = async(req, res) => {
    try {
        await Like.find().exec((err, like) => {
            if(err) {
                return res.status(400).json({
                    error: "No Like Found"
                })
            }
            return res.json(like)
        })
    } catch (error) {
        console.log(error)
    }
}

//Update Like Data
exports.updateLike = async(req, res) => {
    try {
        const editLike = await req.like
        editLike._id = req.body.likeId
        editLike.like = req.body.like
        editLike.userId = req.body.userId
        editLike.postId = req.body.postId
        editLike.save((err, like) => {
            if(err){
                return res.status(400).json({
                    error: "Like data not updated"
                })
            }
            res.json({like})
        })
    }catch(error){
        console.log(error)
    }
}

//Delete Like Data
exports.deleteLike = async(req, res) => {
    try {
        const removeLike = await req.like
        Like.deleteOne(removeLike, (err, like) => {
            if(err){
                return res.status(400).json({
                    error: "No Like Found"
                })
            }else {
                if(like.ok === 1){
                    Like.find().populate('userId').exec((err, like) => {
                        if(err) {
                            return res.status(400).json({
                                error: "No Like Found"
                            })
                        }
                        return res.json(like)
                    })
                }
            }           
        })
    } catch (error) {
        console.log(error)
    }
}

