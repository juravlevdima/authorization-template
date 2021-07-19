import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const { Schema, model } = mongoose

const userSchema = new Schema({
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user'
  }
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  this.password = bcrypt.hashSync(this.password, 10)
  return next()
})

userSchema.methods.authenticate = function(password) {
  return bcrypt.compareSync(password, this.password)
}

export default model('Users', userSchema)
