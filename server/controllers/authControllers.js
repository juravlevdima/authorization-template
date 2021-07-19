import jwt from 'jsonwebtoken'
import Users from '../models/userModel.js'


export const signUp = (req, res) => {
  const { email, password, role } = req.body

  Users.findOne({ email }).exec((err, user) => {
    if (err || user) {
      return res.status(400).json({ error: 'Пользователь с таким email уже существует', err })
    }

    const newUser = new Users({ email, password, role })
    newUser.save((err) => {
      if (err) {
        return res.status(401).json({ error: 'Ошибка добавления пользователя', err })
      }
      return res.json({ message: 'Пользователь добавлен' })
    })
  })
}


export const signIn = (req, res) => {
  const { name, password } = req.body

  Users.findOne({ name }).exec((error, user) => {
    if (error || !user) {
      return res.status(400).json({ error: 'Неверный логин или пароль' })
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({ error: 'Неверный логин или пароль' })
    }

    const { _id, name, role } = user
    const secret = process.env.SECRET_JWT_KEY || 'secret'
    const token = jwt.sign({ _id, name, role }, secret, { expiresIn: '2h' })
    res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 2 })

    return res.json({
      token,
      user: { _id, name, role }
    })
  })
}


export const authenticate = (req, res) => {
  const token = req && req.cookies && req.cookies.token

  if (!token) {
    return res.status(401).json({ error: 'Пользователь не авторизован' })
  }

  try {
    const secret = process.env.SECRET_JWT_KEY || 'secret'
    const decodedToken = jwt.verify(token, secret)
    const { _id } = decodedToken

    Users.findOne({ _id }).exec((err, user) => {
      if (err || !user) {
        return res.status(401).json({ error: 'Пользователь не авторизован или был удален' })
      }

      const { _id, name, role } = user
      return res.json({ _id, name, role })
    })
  } catch (e) {
    return res.status(401).json({ error: 'Пользователь не авторизован' })
  }
}
