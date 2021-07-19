import express from 'express'
import { signUp, signIn, authenticate } from '../controllers/authControllers.js'
import runValidation from '../validators/index.js'
import { signUpValidator } from '../validators/authValidator.js'

const router = express.Router()

router.post('/signUp', signUpValidator, runValidation, signUp)
router.post('/signIn', signIn)
router.get('/authenticate', authenticate)

export default router
