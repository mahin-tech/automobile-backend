const express = require('express')
const router = express.Router()

const { createLike, getAllLike, getLike, getLikeById, updateLike, deleteLike } = require("../controllers/like")

//Parameter of Like
router.param("likeId", getLikeById)

//Create Like Route
router.post("/create/like", createLike)

//Get Like Route
router.get('/get/like/:likeId', getLike)
router.get('/like', getAllLike)

//Update Like Route
router.put('/edit/like/:likeId', updateLike)

//Delete Like Route
router.delete('/delete/like/:likeId', deleteLike)

module.exports = router
