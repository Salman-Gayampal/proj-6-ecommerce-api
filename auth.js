const jwt = require('jsonwebtoken');
const secret = "ecommerceAPI";

module.exports.createAccessToken = (user) => {
    const data = {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin
    };


    return jwt.sign(data, secret, {})
};

// TOKEN VERIFICATION
module.exports.verify = (req, res, next) => {

    let token = req.headers.authorization
    console.log(token)

    if (typeof token !== "undefined") {

        token = token.slice(7, token.length)

        return jwt.verify(token, secret, (error, data) => {
            if (error) {
                return res.send({ auth: "Authentication Failed. Please ensure you have your credentials entered." })
            } else {
                next()
            }
        })
    } else {
        return res.send({ auth: "Authentication Failed. Please ensure you have your credentials entered." })
    }
};

// TOKEN DECRYPTION
module.exports.decode = (token) => {

    if (typeof token !== "undefined") {
        token = token.slice(7, token.length)
        return jwt.verify(token, secret, (error, data) => {
            if (error) {
                return null
            } else {
                return jwt.decode(token, { complete: true }.payload)
            }
        })
    } else {
        return null
    }
};