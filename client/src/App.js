import React, { useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { authenticate } from './redux/actions/authActions'

import PrivateRoute from './components/common/PrivateRoute'
import OnlyAnonymousRoute from './components/common/OnlyAnonymousRoute'

import Main from './components/Main'               // ----------- Main demo component
import SignInPage from './components/SignInPage'   // ----------- Demo component
import SignUpPage from './components/SignUpPage'   // ----------- Demo component

function App() {
  const dispatch = useDispatch()
  const { wait } = useSelector((s) => s.auth)
  useEffect(() => {
    dispatch(authenticate())
  }, [dispatch])

  if (wait) {
    return (

      // -----  Loading component during cookie authentication  -----
      <div className="flex items-center justify-center h-screen">
        Подождите...
      </div>
      // ------------------------------------------------------------

    )
  } else {
    return (
      <Switch>


        {/* -------------------------- You can add routes here: --------------------------- */}


        {/* -------------------------- Route demonstration: ------------------------------ */}
        <Route exact path="/" component={() => <Main />} />
        <OnlyAnonymousRoute exact path="/sign-in" component={() => <SignInPage />} />
        <OnlyAnonymousRoute exact path="/sign-up" component={() => <SignUpPage />} />
        <PrivateRoute exact path="/private" roles={['user']} component={() => <>PRIVATE</>} />
        {/* ------------------------------------------------------------------------------ */}


        <Redirect to="/" />
      </Switch>
    )
  }

}

export default App
