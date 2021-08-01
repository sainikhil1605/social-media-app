const UserModel = require("../models/User");
const PostModel = require("../models/Posts")
exports.addFollowerController = (req, res) => {
    UserModel.findOne({ email: req.body.email }, (err, docs) => {
        if (docs.followers.includes(req.params.id)) {
            res.send("Already Following");
        }
        else {
            UserModel.findOneAndUpdate({ email: req.body.email }, { $push: { followers: req.params.id } }
                , (err, doc) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        UserModel.findOneAndUpdate({ _id: req.params.id }, { $push: { following: docs._id } }, (err) => {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                res.send("Follwing Added");
                            }
                        })
                    }
                })
        }
    })
}
exports.addPost = (req, res) => {
    new PostModel({ userId: req.params.id, desc: req.body.desc, img: req.params.img }).save((err) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send("Post Added");
        }
    })
}