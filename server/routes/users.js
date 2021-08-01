const router = require('express').Router();
const userController = require("../controllers/userController");
router.post("/:id/addFollowing", userController.addFollowerController);
router.post("/:id/addPost", userController.addPost)
// router.post("/:id/addLike",)


module.exports = router;
