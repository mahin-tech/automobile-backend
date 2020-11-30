const express = require("express");
const router = express.Router();

let { check, validationResult } = require('express-validator')

const {
    createUser,
    signIn,
    facebookLogin,
    googleLogin,
    getUserById,
    getAllUser,
    getUser,
    updateUser,
    deleteUser,
    signout
} = require("../controllers/auth");

//Parameter of user id
router.param("userId", getUserById)

//Create SignUp Route
router.post("/create/user", [
    check("email", "Email is required").isEmail(),
    check("password", "Password should be atleast 5 char").isLength({ min: 5 })
], createUser);

//Create SignIn Route
router.post("/signin", [
    check("email", "Email is Required").isEmail(),
    check("password", "Password field is required").isLength({ min: 5 }),
], signIn);

//Create Signout Route
router.get('/signout', signout)

//Get User Route
router.get('/user', getAllUser)
router.get('/get/user/:userId', getUser)

//Update User Route
router.put('/edit/user/:userId', updateUser)

//Delete User Route
router.delete('/delete/user/:userId', deleteUser)

//Facebook Login Route
router.post('/facebooklogin', facebookLogin)

//Google Login Route
router.post('/googlelogin', googleLogin)

module.exports = router;