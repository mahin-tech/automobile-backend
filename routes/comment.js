const express = require('express')
const router = express.Router()

const { createComment, getAllComment, getComment, getCommentById, updateComment, deleteComment } = require("../controllers/comment")

//Parameter of Comment
router.param("commentId", getCommentById)

//Create Comment Route
router.post("/create/comment", createComment)

//Get Comment Route
router.get('/get/comment/:commentId', getComment)
router.get('/comment', getAllComment)

//Update Comment Route
router.put('/edit/comment/:commentId', updateComment)

//Delete Comment Route
router.delete('/delete/comment/:commentId', deleteComment)

module.exports = router
