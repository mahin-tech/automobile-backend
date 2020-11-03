const Post = require("../models/post");
const mongoose = require("mongoose");
const Tag = require("../models/tag");
const slug = require("slug");

//Get Post Id of Tag Controller
exports.getPostById = async (req, res, next, id) => {
        try {
                await Post.findById(id).exec((err, post) => {
                        if (err) {
                                return res.status(400).json({
                                        error: "Post Data Not Found",
                                });
                        }
                        req.post = post;
                        next();
                });
        } catch (error) {
                console.log(error);
        }
};

//Store Post Data In Tag Collection
exports.createPost = async (req, res) => {
        try {
                const ObjectId = await mongoose.Types.ObjectId;
                let array = [];
                req.body.tagId.map((tagItem) => {
                        if (!ObjectId.isValid(tagItem)) {
                                const tag = new Tag({ tagName: tagItem });

                                tag.save((err, tagModel) => {
                                        if (err) {
                                                return res.status(400).json({
                                                        error:
                                                                "Tag not able to save",
                                                });
                                        } else {
                                                return array.push(
                                                        tagModel._id.toString()
                                                );
                                        }
                                });
                        } else {
                                return array.push(tagItem);
                        }
                });
                setTimeout(() => {
                        const post = new Post(req.body);
                        post.image = req.file.filename;
                        post.tagId = array;
                        post.save((err, post) => {
                                if (err) {
                                        return res.status(400).json({
                                                error: "Post not able to save",
                                        });
                                }
                                return res.json({ post });
                        });
                }, 2000);
        } catch (error) {
                console.log(error);
        }
};

//Get Post Data
exports.getPost = (req, res) => {
        try {
                return res.json(req.post);
        } catch (error) {
                console.log(error);
        }
};

//Get All Post Data
exports.getAllPost = async (req, res) => {
        try {
                await Post.find()
                        .populate("categoryId authorBy")
                        .exec((err, post) => {
                                if (err) {
                                        return res.status(400).json({
                                                error: "No Post Found",
                                        });
                                }
                                return res.json(post);
                        });
        } catch (error) {
                console.log(error);
        }
};
//Update like Post
exports.updateLike = async (req, res) => {
        console.log("POSTID", req.body.postId);
        console.log("UserID", req.auth);
        try {
                Post.findByIdAndUpdate(
                        req.body.postId,
                        {
                                $push: { likes: req.auth._id },
                        },
                        {
                                new: true,
                        }
                )
                        .populate("authorBy")
                        .exec((err, result) => {
                                if (err) {
                                        return res.status(422).json({
                                                error: "No Likes Found",
                                        });
                                }
                                return res.json(result);
                        });
                // setTimeout(() => {
                //         const editPost = req.post;
                //         editPost._id = req.body.postId;
                //         editPost.likes = req.body.likes;

                //         editPost.save((err, post) => {
                //                 if (err) {
                //                         return res.status(400).json({
                //                                 error: "No Like data updated",
                //                         });
                //                 }
                //                 res.json({ post });
                //         });
                // }, 2000);
        } catch (error) {
                console.log(error);
        }
};
//Update Post Data
exports.updatePost = async (req, res) => {
        try {
                const ObjectId = await mongoose.Types.ObjectId;
                let array = [];
                req.body.tagId.map((tagItem) => {
                        if (!ObjectId.isValid(tagItem)) {
                                const tag = new Tag({ tagName: tagItem });
                                tag.save((err, tagModel) => {
                                        if (err) {
                                                return res.status(400).json({
                                                        error:
                                                                "Tag not able to save",
                                                });
                                        } else {
                                                return array.push(
                                                        tagModel._id.toString()
                                                );
                                        }
                                });
                        } else {
                                return array.push(tagItem);
                        }
                });
                setTimeout(() => {
                        const editPost = req.post;
                        editPost._id = req.body.postId;
                        editPost.title = slug(req.body.title);
                        editPost.description = req.body.description;
                        editPost.content = req.body.content;
                        editPost.publishedAt = req.body.publishedAt;
                        editPost.categoryId = req.body.categoryId;
                        editPost.likes = req.body.likes;
                        editPost.tagId = array;
                        editPost.authorBy = req.body.authorBy;
                        editPost.status = req.body.status;
                        if (req.file) {
                                editPost.image = req.file.filename;
                        }
                        editPost.save((err, post) => {
                                if (err) {
                                        return res.status(400).json({
                                                error: "Post data not updated",
                                        });
                                }
                                res.json({ post });
                        });
                }, 2000);
        } catch (error) {
                console.log(error);
        }
};

//Delete Post Data
exports.deletePost = async (req, res) => {
        try {
                const removePost = await req.post;
                Post.deleteOne(removePost, (err, post) => {
                        if (err) {
                                return res.status(400).json({
                                        error: "No Post Found",
                                });
                        } else {
                                if (post.ok === 1) {
                                        Post.find({ status: "true" })
                                                .populate("categoryId")
                                                .exec((err, post) => {
                                                        if (err) {
                                                                return res
                                                                        .status(
                                                                                400
                                                                        )
                                                                        .json({
                                                                                error:
                                                                                        "No Post Found",
                                                                        });
                                                        }
                                                        return res.json(post);
                                                });
                                }
                        }
                });
        } catch (error) {
                console.log(error);
        }
};
