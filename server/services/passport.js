import passportJWT from 'passport-jwt'
import dotenv from 'dotenv'
import Users from '../models/userModel.js'

dotenv.config()

const cookieExtractor = (req) => {
  return req && req.cookies && req.cookies.token
}

const jwtOptions = {
  secretOrKey: process.env.SECRET_JWT_KEY || 'secret',
  jwtFromRequest: passportJWT.ExtractJwt.fromExtractors([cookieExtractor])
}

const jwtStrategy = new passportJWT.Strategy(jwtOptions, (payload, done) => {
  Users.findById({ _id: payload._id }, (err, user) => {
    if (err) return done(err, null)
    if (user) return done(err, user)
    return done(null, false)
  })
})

export default jwtStrategy
