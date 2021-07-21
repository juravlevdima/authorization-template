import express from 'express'
import { signUp, signIn, authenticate } from '../controllers/authControllers.js'
import runValidation from '../validators/index.js'
import { signUpValidator } from '../validators/authValidator.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/sign-up', signUpValidator, runValidation, signUp)
router.post('/sign-in', signIn)
router.get('/authenticate', authenticate)

// --------------------------------------  Delete this demo route  -----------------------------------------
router.get('/private', authMiddleware(['user']), (req, res) => res.json({ message: "Доступ разрешен" }))
// ---------------------------------------------------------------------------------------------------------


export default router
