const Location = require("../models/location");
const { responseHandler } = require('../config/ResponseHandler')

//Store Location data
exports.createLocation = async (req, res) => {
    try {
        const location = await new Location(req.body);
        location.save((err, location) => {
            if (err) {
                return errorHandle(404, 'Location not able to save', res)
            }
            return res.send(responseHandler({ location }));
        });
    } catch (error) {
        console.log(error);
    }
};

//Get All location Data
exports.getAllLocation = async (req, res) => {
    try {
        await Location.find({
            location: {
                $near: {
                    $maxDistance: 15000,
                    $geometry: {
                        type: "Point",
                        coordinates: [
                            parseFloat(req.query.lng),
                            parseFloat(req.query.lat),
                        ],
                    },
                },
            },
        })
            .populate("brandId")
            .exec((err, location) => {
                if (err) {
                    return errorHandle(404, 'Location not found!', res)
                }
                return res.send(responseHandler({ location }));
            });
    } catch (error) {
        console.log(error);
    }
};