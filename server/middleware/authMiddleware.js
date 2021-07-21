import passport from 'passport'

const handleJWT = (req, res, next, roles) => {
  return async (err, user, info) => {
    if (err || info || !user)
      return res.status(401).json({ err, info, error: "Доступ запрещен!" })

    await req.logIn(user, { session: false })
    if (!roles.includes(user.role))
      return res.status(401).json({ error: "Доступ запрещен!" })

    req.user = user
    return next()
  }
}

const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    const authenticate = passport.authenticate('jwt', { session: true }, handleJWT(req, res, next, roles))
    return authenticate(req, res, next)
  }
}

export default authMiddleware
