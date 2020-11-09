const Location = require("../models/location");

//Store Location data
exports.createLocation = async (req, res) => {
    try {
        const location = await new Location(req.body);
        location.save((err, location) => {
            if (err) {
                return res.status(400).json({
                    error: "location not able to save",
                });
            }
            return res.json(location);
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
                    return res.status(400).json({
                        error: "No location Found",
                    });
                }
                return res.json(location);
            });
    } catch (error) {
        console.log(error);
    }
};