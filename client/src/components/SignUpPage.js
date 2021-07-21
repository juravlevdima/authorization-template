

// ---------------------------------------------------------------
// ----  This component is an authorization demonstration!!!  ----
// ---------------------------------------------------------------



import React, { useState } from 'react'
import { useDispatch  } from 'react-redux'
import { useHistory } from 'react-router'
import axios from 'axios'
import { signIn } from '../redux/actions/authActions'

const SignUpPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passRepeat, setPassRepeat] = useState('')
  const [resError, setResError] = useState(null)

  const signUpButtonClick = () => {
    if (passRepeat !== password) {
      setResError('Введенные пароли не совпадают')
      return;
    }

    axios({
      method: 'POST',
      url: '/api/v1/sign-up',
      data: {
        email,
        password
      }
    }).then(({ data }) => dispatch(signIn(data.user, data.token)))
      .then(() => {
        alert("Вы зарегистрировались!")
        history.push('/')
      })
      .catch(e => e?.response?.data?.error && setResError(e.response.data.error))
  }

  return (
    <div className="absolute top-0 bg-white z-50">
      <div className="flex items-center justify-center h-screen w-screen">
        <div className="w-4/5 md:w-1/2 lg:w-1/3 p-4 rounded-lg custom-shadow">
          <div className="text-center text-xl font-semibold pb-2">Регистрация</div>
          <hr />
          <input
            autoFocus={true}
            type="text"
            placeholder="Введите email"
            className="my-2 w-full text-xl text-center border-2 rounded-lg focus:border-blue-500"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Введите пароль"
            className="mb-2 w-full text-xl text-center border-2 rounded-lg focus:border-blue-500"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Введите пароль еще раз"
            className="mb-2 w-full text-xl text-center border-2 rounded-lg focus:border-blue-500"
            onChange={(e) => setPassRepeat(e.target.value)}
          />
          <hr />
          <div className="text-center my-4">
            <button
              type="button"
              className="transition duration-300 ease-in-out bg-green-700 hover:bg-green-900 text-white font-semibold py-2 px-8 rounded"
              onClick={signUpButtonClick}
              // disabled={!(email && password)}
            >
              Зарегистрироваться
            </button>
          </div>
          {resError && <div className="text-center text-red-600 font-semibold">{resError}</div>}
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
