const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;
const passport = require("passport");

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

    if (user && user[process.env.NAMESPACE + '/role'] == role) {
        next();
    } else {
        return res.status(401).send({ title: 'Not Authorized', detail: 'You are not authorized to access this data' })
    }
}