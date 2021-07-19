import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import cookieParser from 'cookie-parser'
import passport from 'passport'

import dbConnect from './services/mongoose.js'
import jwtStrategy from './services/passport.js'

import authRoutes from './routes/authRoutes.js'

dotenv.config()
const port = process.env.PORT || 8080
const server = express()

dbConnect()

server.use(express.json())
server.use(cors())
server.use(cookieParser())
passport.initialize()
passport.use('jwt', jwtStrategy)


server.use('/api/v1', authRoutes)


if (process.env.NODE_ENV === 'production') {
  server.use(express.static(path.resolve('client/build')))
  server.get('/*', (req, res) => {
    res.sendFile(path.resolve('client/build/index.html'))
  })
}

server.listen(port, () => {
  console.log(`Server has been started on http://localhost:${port}.\nPlease press CTRL + C to stop the server`)
})
