
const jwt = require('jsonwebtoken');
const config = require('./../../config/config');

module.exports = {
    create_token : (userid) => {
        return jwt.sign({
            iss: config.jwt.issuer,
            sub: userid,
            lat: new Date().getTime(),
            exp: Math.floor(Date.now() / 1000) + (60 * 60*3)
        }, config.jwt.secret);
    }

}
