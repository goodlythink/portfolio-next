const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;
const passport = require("passport");

const namespace = 'http://localhost:3000/'

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    secretOrKey: "art"
}

const jwtAuth = new JwtStrategy(jwtOptions, (jwt_payload, done) => {
    if (jwt_payload.data == "goodlythink") done(null, jwt_payload);
    else done(null, false, { message: 'Incorrect password.' })
})

passport.use(jwtAuth);
exports.checkJWT = passport.authenticate("jwt", { session: false })

exports.checkRole = role => (req, res, next) => {
    const user = req.user;

    if (user && user[namespace + 'role'] == role) {
        next();
    } else {
        return res.status(401).send({ title: 'Not Authorized', detail: 'You are not authorized to access this data' })
    }
}

// MIDDLEWARE
// exports.checkJWT = function (req, res, next) {
//     const isValidToken = true;
//     if (isValidToken) {
//         next();
//     } else {
//         return res.status(400).send({ title: 'Not Authrized', detail: 'Please login in order to get a data' })
//     }
// }