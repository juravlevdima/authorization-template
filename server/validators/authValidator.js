import validator from 'express-validator'
const { check } = validator

const signUpValidator = [
  check('email')
    .isEmail()
    .withMessage('Укажите верный email'),

  check('password')
    .isLength({ min: 6 })
    .withMessage('Минимальная длина пароля 6 символов'),

  check('role')
    .optional()
    .isIn(['user', 'admin'])
    .withMessage('Укажите роль: admin или user'),
]

export { signUpValidator }
