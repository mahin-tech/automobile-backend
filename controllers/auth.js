const User = require('../models/user')

//Create Register Data
exports.signUp = async (req, res) => {
    try {
        const user = new User(req.body)
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