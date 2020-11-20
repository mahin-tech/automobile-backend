const express = require("express");
const router = express.Router();

const { createItem, getAllItem } = require("../controllers/extraItem");

//Create Location Route
router.post("/create/item", createItem);

//Get Location Route
router.get("/item", getAllItem);

module.exports = router;