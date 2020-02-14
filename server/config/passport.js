const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const config = require('./config');
const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies) {
      token = req.cookies['access_token'];
    }
    return token;
  }

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.jwtsecret,
}, 
    async (payload, done) => {

}))