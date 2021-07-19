import passport from 'passport'

const handleJWT = (req, res, next, role) => {
  return async (err, user, info) => {
    if (err || info || !user)
      return res.status(401).json({ err, info, error: "Доступ запрещен!" })

    await req.logIn(user, { session: false })
    if (role !== 'admin')
      return res.status(401).json({ error: "Доступ запрещен!" })

    req.user = user
    return next()
  }
}

const authMiddleware = (role) => (req, res, next) => {
  const authenticate = passport.authenticate('jwt', { session: true }, handleJWT(req, res, next, role))
  return authenticate(req, res, next)
}

export default authMiddleware
