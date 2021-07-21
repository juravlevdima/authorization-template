

// ---------------------------------------------------------------
// ----  This component is an authorization demonstration!!!  ----
// ---------------------------------------------------------------



import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { signOut } from '../redux/actions/authActions'

const Main = () => {
  const dispatch = useDispatch()
  const { isAuth } = useSelector((s) => s.auth)

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-gray-200 font-bold p-10 custom-shadow">
        <p>ЭТОТ КОМПОНЕНТ - ТЕСТ АВТОРИЗАЦИИ</p>
        <hr />

        <div className="border-t-2 border-b-2 border-black my-5">
          <p>Роуты только для анонимов:</p>
          <Link to="/sign-in">
            <p className="border-2 border-blue-600 text-center my-3">
              Войти
            </p>
          </Link>
          <Link to="/sign-up">
            <p className="border-2 border-blue-600 text-center my-3">
              Зарегистрироваться
            </p>
          </Link>
        </div>
        <div className="border-b-2 border-black my-5">
          <p>Роут только для авторизованных:</p>
          <Link to="/private">
            <p className="border-2 border-blue-600 text-center my-3">
              Приватный
            </p>
          </Link>
          <p className="cursor-pointer border-2 border-blue-600 text-center my-3" onClick={() => {
            axios.get('/api/v1/private')
              .then(({ data }) => alert(data.message))
              .catch((e) => alert(e?.response?.data?.error))
          }}>
            Приватный API
          </p>
        </div>
        {isAuth
          ? <p className="cursor-pointer border-2 border-blue-600 text-center my-3" onClick={() => dispatch(signOut())}>
            Выйти
          </p>
          : null}
      </div>
    </div>
  )
}

export default Main
