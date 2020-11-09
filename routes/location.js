const express = require("express");
const router = express.Router();

const { createLocation, getAllLocation } = require("../controllers/location");

//Create Location Route
router.post("/create/location", createLocation);

//Get Location Route
router.get("/location", getAllLocation);

module.exports = router;