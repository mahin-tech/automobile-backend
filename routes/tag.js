const express = require('express')
const router = express.Router()

const { createTag, getTag, getAllTag, getTagById, updateTag, deleteTag } = require("../controllers/tag")

//Parameter of Tag
router.param("tagId", getTagById)

//Create Tag Route
router.post("/create/tag", createTag)

//Get Tag Data
router.get('/get/tag/:tagId', getTag)
router.get('/tag', getAllTag)

//Update Tag Data
router.put('/edit/tag/:tagId', updateTag)

//Delete Tag Data
router.delete('/delete/tag/:tagId', deleteTag)

module.exports = router
