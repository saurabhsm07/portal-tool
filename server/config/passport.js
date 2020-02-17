const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const config = require('./config');
const User = require('./../models/user');

const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['access_token'];
    }
    return token;
}

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
    secretOrKey: config.jwt.secret,
},
    async (payload, done) => {
console.log(payload)
        try {
            let user = {}
             User.findAll({ where: { id: payload.sub } })
                .then((data) => {
                    if (data.length == 1) {
                        console.log(`fetched user with id : ${data[0].id}`);
                         user = data[0];
                         done(null, user);
                    }else{
                        return done(null, false);
                    }
                })
                .catch((err) => {
                    console.log("ERROR :");
                    console.log(err.stack);
                    done(err, false)
                })
        } catch (error) {
            done(error, false)
        }
    }))