const mongoose = require("mongoose");
const Brand = require("./brand");
const { ObjectId } = mongoose.Schema;

const mapSchema = new mongoose.Schema({
    type: {
        type: String,
        default: "Point",
    },
    coordinates: {
        type: [Number],
    },
});

//Create Location Schema
const locationSchema = new mongoose.Schema(
    {
        brandId: {
            type: ObjectId,
            ref: Brand,
            default: null,
        },

        location: {
            type: mapSchema,
            index: "2dsphere",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Location", locationSchema);