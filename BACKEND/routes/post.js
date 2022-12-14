const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const refresh = require("../middleware/refresh");
const multer = require("../middleware/multer-config");

const postCtrl = require("../controllers/post");

router.post("/", auth, multer, postCtrl.createPost);
router.post("/:id/like", auth, postCtrl.likePost);
router.delete("/:id", auth, postCtrl.deletePost);
router.put("/:id", auth, multer, postCtrl.modifyPost);
router.get("/:id", auth, postCtrl.getOnePost);
router.get("/page/:page", auth, postCtrl.getAllPosts);

module.exports = router;
