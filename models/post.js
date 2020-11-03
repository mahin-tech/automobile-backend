const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const Category = require("./category");
const Tag = require("./tag");
const User = require("./user");

const postSchema = new mongoose.Schema(
        {
                title: {
                        type: String,
                        default: null,
                },
                description: {
                        type: String,
                        default: null,
                },
                content: {
                        type: String,
                        default: null,
                },
                publishedAt: {
                        type: Date,
                },
                image: {
                        type: String,
                        default: null,
                },
                categoryId: {
                        type: ObjectId,
                        ref: Category,
                        default: null,
                },
                tagId: {
                        type: [ObjectId],
                        ref: Tag,
                        default: null,
                },
                likes: {
                        type: [ObjectId],
                        ref: User,
                        default: null,
                },
                authorBy: {
                        type: ObjectId,
                        ref: User,
                        default: null,
                },
                status: {
                        type: Boolean,
                        default: "true",
                        enum: ["true", "false"],
                },
        },
        { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
