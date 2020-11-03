const Discussion = require('../models/discussion')

//Get Discussion Id of Tag Controller
exports.getDiscussionById = async(req, res, next, id) => {
    try{
        await Discussion.findById(id).exec((err, discussion) => {
            if(err){
                return res.status(400).json({
                    error: "Discussion Data Not Found"
                })
            }
            req.discussion = discussion
            next()
        })
    }catch(error){
        console.log(error)
    }
}

//Store Discussion Data In Tag Collection
exports.createDiscussion = async(req, res) => {
    try{
        const discussion = await new Discussion(req.body)
        discussion.save((err, discussion) => {
            if(err) {
                return res.status(400).json({
                    error: "Tag not able to save"
                })
            }
            return res.json({discussion})
        })
    }catch(error){
        console.log(error)
    }
}

//Get Discussion Data 
exports.getDiscussion = (req, res) => {
    try {
        return res.json(req.discussion)
    }catch(error){
        console.log(error)
    }
}

//Get All Discussion Data
exports.getAllDiscussion = async(req, res) => {
    try {
        await Discussion.find().exec((err, discussion) => {
            if(err) {
                return res.status(400).json({
                    error: "No Discussion Found"
                })
            }
            return res.json(discussion)
        })
    } catch (error) {
        console.log(error)
    }
}

//Update Discussion Data
exports.updateDiscussion = async(req, res) => {
    try {
        const editDiscussion = await req.discussion
        editDiscussion._id = req.body.discussionId
        editDiscussion.title = req.body.title
        editDiscussion.content = req.body.content
        editDiscussion.lastPost = req.body.lastPost
        editDiscussion.lastPostBy = req.body.lastPostBy
        editDiscussion.status = req.body.status
        editDiscussion.save((err, discussion) => {
            if(err){
                return res.status(400).json({
                    error: "Discussion data not updated"
                })
            }
            res.json({discussion})
        })
    }catch(error){
        console.log(error)
    }
}

//Delete Discussion Data
exports.deleteDiscussion = async(req, res) => {
    try {
        const removeDiscussion = await req.discussion
        Discussion.deleteOne(removeDiscussion, (err, discussion) => {
            if(err){
                return res.status(400).json({
                    error: "No Discussion Found"
                })
            }else {
                if(discussion.ok === 1){
                    Discussion.find().exec((err, discussion) => {
                        if(err) {
                            return res.status(400).json({
                                error: "No Discussion Found"
                            })
                        }
                        return res.json(discussion)
                    })
                }
            }           
        })
    } catch (error) {
        console.log(error)
    }
}

