const User = require("../models/User");
const bcrypt = require('bcrypt');
exports.registerController = (req, res) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
            new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
            }).save((err) => {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send("Saved");
                }
            })
        })
    })
}

exports.loginController = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        res.send(404).json("user not found");
    }
    else {

        const match = await bcrypt.compare(req.body.password, user.password)
        if (!match) {
            res.send("Login Failed");
        }
        else {
            res.send("Login Success");
        }

    }
}