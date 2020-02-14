
const jwt = require('jsonwebtoken');
const config = require('./../config/config');


const jwt_token = {};


jwt_token.create_token = (user) => {
    return jwt.sign({
        iss: config.jwt.issuer,
        sub: user.id,
        lat: new Date().getTime(),
        exp: new Date().setDate(new Date().getTime() + 1)
    }, config.jwt.secret);
}

module.exports = jwt_token;