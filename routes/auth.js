const express = require("express");
const router = express.Router();

const { signUp, signIn } = require("../controllers/auth");

//Create SignUp Route
router.post("/signup", signUp);

//Get SignIn Route
router.post("/signin", signIn);

module.exports = router;