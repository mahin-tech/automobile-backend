const express = require('express')
const router = express.Router()
const multer = require('multer')

let { check,validationResult} = require('express-validator');

let storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './public/upload')
	},
	filename: (req, file, cb) => {
		let filetype = ''
		if(file.mimetype === 'image/gif'){
			filetype = 'gif'
		}
		if(file.mimetype === 'image/png'){
			filetype = 'png'
		}
		if(file.mimetype === 'image/jpeg'){
			filetype = 'jpg'
		}
		cb(null, 'image-'+ Date.now()+ '.'+ filetype)
	}
})

let upload = multer({ storage: storage })

const {
	signout, 
	createUser,
	forgotPassword,
	resetPassword, 
	signin,
    isSignedIn, 
	getUserById, 
	getUser,
	getAllUser, 
	updateUser,
	deleteUser } = require("../controllers/auth")

//Get Parameter of user
router.param("userId", getUserById)

//Create user Route
router.post("/create/users",[
    check("email","Email is Required").isEmail(),
    check("password","Password Should be at least 5 Char").isLength({ min: 5 }),
] ,upload.single('avtar') , createUser)

//Forgot Password Route
router.put("/forgotpassword", forgotPassword)

//Reset Password Route
router.put("/resetpassword", resetPassword)

//Read User Route
router.get("/get/users/:userId", getUser)
router.get("/users", getAllUser)

//Update User Route
router.put("/edit/users/:userId",upload.single('avtar'), updateUser)

//Delete User Route
router.delete("/delete/users/:userId", deleteUser)

//Create signin Route
router.post("/signin",[
    check("email","Email is Required").isEmail(),
    check("password","Password field is required").isLength({ min: 5 }),
], signin)

//Create Signout Route
router.get("/signout", signout)

module.exports = router