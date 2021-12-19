import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {authenticate} from './redux/actions/authActions'

import PrivateRoute from './components/common/PrivateRoute'
import OnlyAnonymousRoute from './components/common/OnlyAnonymousRoute'

import Main from './components/Main'               // ----------- Main demo component
import SignInPage from './components/SignInPage'   // ----------- Demo component
import SignUpPage from './components/SignUpPage'   // ----------- Demo component

function App() {
  const dispatch = useDispatch()
  const {wait} = useSelector((s) => s.auth)

  if (wait) {
    dispatch(authenticate())
    return (
      // -----  Loading component during cookie authentication  -----
      <div className="flex items-center justify-center h-screen">
        Подождите...
      </div>
      // ------------------------------------------------------------
    )
  } else {
    return (
      <Routes>

        {/* -------------------------- You can add routes here: --------------------------- */}

        {/* -------------------------- Route demonstration: ------------------------------ */}
        <Route path="/" element={<Main/>}/>
        <Route path="/sign-in" element={<OnlyAnonymousRoute> <SignInPage/> </OnlyAnonymousRoute>} />
        <Route path="/sign-up" element={<OnlyAnonymousRoute> <SignUpPage/> </OnlyAnonymousRoute>} />
        <Route path="/private" element={<PrivateRoute roles={['user']}> <>PRIVATE</> </PrivateRoute>} />
        {/* ------------------------------------------------------------------------------ */}

        <Route path="*" element={<Navigate to="/" replace/>}/>
      </Routes>
    )
  }

}

export default App
