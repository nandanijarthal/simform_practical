const jwt = require("jsonwebtoken");
require('dotenv').config();

exports.createJwtToken = async (user_id) => {
    var token = jwt.sign({
        id: user_id
    }, process.env.JWT_SECRET, {
        expiresIn:  "24 hours" 
    });
    return token;
};