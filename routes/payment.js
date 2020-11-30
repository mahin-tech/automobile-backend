const express = require("express");
const router = express.Router();
const { getToken, processPayment } = require("../controllers/payment");
const { getUserById } = require("../controllers/auth");

//params
router.param("userId", getUserById);

//Get Payment Token Route
router.get("/payment/gettoken/:userId", getToken);

//Payment Process Route
router.post("/payment/braintree/:userId", processPayment);

module.exports = router;