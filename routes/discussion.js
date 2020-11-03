const express = require('express')
const router = express.Router()

const { createDiscussion, getAllDiscussion, getDiscussion, getDiscussionById, updateDiscussion, deleteDiscussion } = require("../controllers/discussion")

//Parameter of Discussion
router.param("discussionId", getDiscussionById)

//Create Discussion Route
router.post("/create/discussion", createDiscussion)

//Get Discussion Data
router.get('/get/discussion/:discussionId', getDiscussion)
router.get('/discussion', getAllDiscussion)

//Update Discussion Data
router.put('/edit/discussion/:discussionId', updateDiscussion)

//Delete Discussion Data
router.delete('/delete/discussion/:discussionId', deleteDiscussion)

module.exports = router
