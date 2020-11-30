const express = require("express");
const router = express.Router();

const { createItem, getAllItem } = require("../controllers/extraItem");

//Create Item Route
router.post("/create/item", createItem);

//Get Item Route
router.get("/item", getAllItem);

module.exports = router;