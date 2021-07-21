import { combineReducers } from 'redux'
import auth from './authReducer'

const createRootReducer = () => combineReducers({
  auth
})

export default createRootReducer
