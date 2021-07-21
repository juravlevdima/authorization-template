import Cookies from 'universal-cookie'
import t from '../types/authActionTypes'

const cookies = new Cookies()

const initialState = {
  user: {},
  isAuth: false,
  token: cookies.get('token'),
  wait: true
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.SIGN_IN:
      return {
        ...state,
        user: action.user,
        token: action.token,
        isAuth: action.isAuth
      }
    case t.SIGN_OUT:
      cookies.remove('token', { path: '/' })
      return {
        ...state,
        user: {},
        isAuth: false,
        token: null
      }
    case t.AUTHENTICATE:
      return {
        ...state,
        user: action.data,
        isAuth: action.isAuth,
        wait: false
      }
    default:
      return state
  }
}

export default authReducer
