import axios from "axios"
import t from '../types/authActionTypes'

export function signIn(user, token) {
  const isAuth = !!token
  return { type: t.SIGN_IN, user, token, isAuth }
}

export function signOut() {
  return { type: t.SIGN_OUT }
}

export function authenticate() {
  return (dispatch) => {
    return axios.get('/api/v1/authenticate')
      .then(({ data }) => dispatch({ type: t.AUTHENTICATE, data, isAuth: true }))
      .catch(() => dispatch({ type: t.AUTHENTICATE, data: {}, isAuth: false }))
  }
}
