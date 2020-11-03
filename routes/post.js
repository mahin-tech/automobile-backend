const express = require("express");
const router = express.Router();
const multer = require("multer");
const { isAuthenticate, issignIn } = require("../controllers/auth");

let storage = multer.diskStorage({
        destination: (req, file, cb) => {
                cb(null, "./public/upload");
        },
        filename: (req, file, cb) => {
                let filetype = "";
                if (file.mimetype === "image/gif") {
                        filetype = "gif";
                }
                if (file.mimetype === "image/png") {
                        filetype = "png";
                }
                if (file.mimetype === "image/jpeg") {
                        filetype = "jpg";
                }
                cb(null, "image-" + Date.now() + "." + filetype);
        },
});

let upload = multer({ storage: storage });

const {
        createPost,
        getAllPost,
        getPost,
        getPostById,
        updatePost,
        deletePost,
        updateLike,
} = require("../controllers/post");

//Parameter of Post
router.param("postId", getPostById);

//Create Post Route
router.post("/create/post", upload.single("image"), createPost);

//Get Post Data
router.get("/get/post/:postId", getPost);
router.get("/post", getAllPost);

//Update Post Data
router.put("/edit/post/:postId", upload.single("image"), updatePost);

//Update post like
router.put("/edit/like", issignIn, updateLike);

//Delete Post Data
router.delete("/delete/post/:postId", deletePost);

router.get("/testroute", issignIn, (req, res) => {
        console.log("AUTH", req.auth);
        res.json(req.auth);
});
module.exports = router;
