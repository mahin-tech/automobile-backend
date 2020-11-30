const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.MERCHANT_ID,
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY,
});

//Get the Token
exports.getToken = (req, res) => {
    try {
        gateway.clientToken.generate({}, (err, response) => {
            if (err) {
                return res.status(400).json({
                    error: "Client Token not available"
                })
            } else {
                return res.send(response);
            }
        });
    } catch (error) {
        console.log(error)
    }
};

//Payment Process System
exports.processPayment = (req, res) => {
    try {
        let nonceFromTheClient = req.body.paymentMethodNonce;
        let amountFromTheClient = req.body.amount;

        gateway.transaction.sale(
            {
                amount: amountFromTheClient,
                paymentMethodNonce: nonceFromTheClient,
                options: {
                    submitForSettlement: true,
                },
            }, (err, result) => {
                if (err) {
                    return res.status(400).json({
                        error: "Payment process was not successfully"
                    })
                } else {
                    return res.send(result);
                }
            }
        );
    } catch (error) {
        console.log(error)
    }
};