const User = require('../models/user')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const fetch = require('node-fetch')
const { OAuth2Client } = require('google-auth-library')
const _ = require('lodash')

let client = new OAuth2Client(
    "306922324712-u704i32658h1un3q1hotdn35i3dppo6h.apps.googleusercontent.com"
)

// Get Id of User in controller
exports.getUserById = async (req, res, next, id) => {
    try {
        await User.findById(id).exec((err, user) => {
            if (err) {
                return res.status(400).json({
                    error: "User not found",
                });
            }
            req.user = user;
            next();
        });
    } catch (error) {
        console.log(error);
    }
};

//Create Register Data
exports.createUser = async (req, res) => {
    try {
        const user = await new User(req.body)
        user.save((err, user) => {
            if (err) {
                return res.status(400).json({
                    error: "User not able to save"
                })
            }
            return res.json(user)
        })
    } catch (error) {
        console.log(error)
    }
}

//Create Login Data
exports.signIn = (req, res) => {
    try {
        const errors = validationResult(req);
        const { email, password } = req.body;

        if (!errors.isEmpty()) {
            return res.status(422).json({
                error: errors.array()[0].msg,
            });
        }

        User.findOne({ email }, (err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    error: "User email does not exist",
                });
            }

            if (!user.authenticate(password)) {
                return res.status(401).json({
                    error: "Email and password do not match"
                });
            }
            const token = jwt.sign({ _id: user._id }, process.env.SECRET)
            res.cookie("token", token, { expire: new Date() + 9999 });

            const { _id, firstName, lastName, email, address, mobile, pincode } = user;
            return res.json({
                token,
                user: { _id, firstName, lastName, email, address, mobile, pincode }
            });
        });
    } catch (error) {
        console.log(error);
    }
};

//Get User Information
exports.getUser = (req, res) => {
    try {
        return res.json(req.user);
    } catch (error) {
        console.log(error);
    }
};

//Get All User Information
exports.getAllUser = async (req, res) => {
    try {
        await User.find().exec((err, user) => {
            if (err) {
                return res.status(400).json({
                    error: "No user found",
                });
            }
            return res.json(user);
        });
    } catch (error) {
        console.log(error);
    }
};

//Update User Data
exports.updateUser = async (req, res) => {
    try {
        const user = await req.user;
        user._id = req.body.userId;
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.password = req.body.password;
        user.address = req.body.address;
        user.pinCode = req.body.pinCode;
        user.mobile = req.body.mobile;

        user.save((err, user) => {
            if (err) {
                return res.status(400).json({
                    error: "User not able to update",
                });
            }
            res.json({ user });
        });
    } catch (error) {
        console.log(error);
    }
};

//Delete User Data
exports.deleteUser = async (req, res) => {
    try {
        const user = await req.user;
        User.deleteOne(user, (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: "No User Found",
                });
            } else {
                if (user.ok === 1) {
                    User.find().exec((err, user) => {
                        if (err) {
                            return res.status(400).json({
                                error: "No user found",
                            });
                        }
                        return res.json(user);
                    });
                }
            }
        });
    } catch (error) {
        console.log(error);
    }
};

//Logout User Data
exports.signout = (req, res) => {
    res.clearCookie("token");
    res.json({
        message: "User signout",
    });
};

//LogIn With Google
exports.googleLogin = (req, res) => {
    let { tokenId } = req.body;
    client.verifyIdToken({
        idToken: tokenId,
        audience:
            "306922324712-u704i32658h1un3q1hotdn35i3dppo6h.apps.googleusercontent.com",
    })
        .then((response) => {
            let { email_verified, name, email } = response.payload;
            if (email_verified) {
                User.findOne({ email }, (err, user) => {
                    if (err) {
                        return res.status(400).json({
                            error: "Something Went Wrong..",
                        });
                    } else {
                        if (user) {
                            const token = jwt.sign({ _id: user._id }, process.env.SECRET);
                            res.cookie("token", token, { expire: new Date() + 9999 });
                            const { _id, name, firstName, lastName, email, address, pinCode, mobile } = user;
                            return res.json({
                                token,
                                user: { _id, name, firstName, lastName, email, address, pinCode, mobile, },
                            });
                        } else {
                            let password = email + process.env.SECRET;
                            let newUser = new User({ name, email, password });
                            newUser.save((error, data) => {
                                if (error) {
                                    return res.status(400).json({
                                        err: "Something went wrong",
                                    });
                                }
                                let token = jwt.sign({ _id: data._id, }, process.env.SECRET);
                                const { _id, name, firstName, lastName, email, address, pinCode, mobile } = user;
                                return res.json({
                                    token,
                                    user: { _id, name, firstName, lastName, email, address, pinCode, mobile },
                                });
                            });
                        }
                    }
                });
            }
        });
};

//LogIn With Facebook
exports.facebookLogin = (req, res) => {
    const { userID, accessToken } = req.body;
    let urlGraphFacebook = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;
    fetch(urlGraphFacebook, {
        method: "GET",
    })
        .then((response) => response.json())
        .then((response) => {
            const { name, email } = response;

            User.findOne({ email }, (err, user) => {
                if (err) {
                    return res.status(400).json({
                        error: "Something Went Wrong..",
                    });
                } else {
                    if (user) {
                        const token = jwt.sign({ _id: user._id }, process.env.SECRET);
                        res.cookie("token", token, {
                            expire: new Date() + 9999,
                        });
                        const { _id, name, firstName, lastName, email, address, pinCode, mobile } = user;
                        return res.json({
                            token,
                            user: { _id, name, firstName, lastName, email, address, pinCode, mobile },
                        });
                    } else {
                        let password = email + process.env.SECRET;

                        let newUser = new User({ name, email, password });

                        newUser.save((error, data) => {
                            if (error) {
                                return res.status(400).json({
                                    err: "Something went wrong",
                                });
                            }
                            let token = jwt.sign({ _id: data._id }, process.env.SECRET);

                            const { _id, name, firstName, lastName, email, address, pinCode, mobile } = data;
                            return res.json({
                                token,
                                user: { _id, name, firstName, lastName, email, address, pinCode, mobile },
                            });
                        });
                    }
                }
            });
        });
};
