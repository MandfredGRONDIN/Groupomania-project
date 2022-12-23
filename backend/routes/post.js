const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const postCtrl = require('../controllers/post');
const commentCtrl = require("../controllers/comments");

router.post("/", auth, multer, postCtrl.createPost)

router.put("/:id", auth,  multer, postCtrl.modifyPost)

router.delete("/:id", auth, postCtrl.deletePost);

router.get("/:id", auth, postCtrl.getOnePost);

router.get("/", postCtrl.getAllPost);

router.post("/:id/like", auth, postCtrl.likePost);

// Comment
router.patch("/comment-post/:id", auth, commentCtrl.createComment)

router.patch("/edit-comment/:id", auth, commentCtrl.modifyComment)

router.patch("/delete-comment-post/:id", auth, commentCtrl.deleteComment)

/* router.patch("/:id/like-comment", auth, commentCtrl.likeComment) */

module.exports = router