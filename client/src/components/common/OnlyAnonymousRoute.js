import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const OnlyAnonymousRoute = ({ component: Component, ...rest }) => {
  const { isAuth } = useSelector((s) => s.auth)
  return (
    <Route
      {...rest}
      render={(props) => !isAuth
        ? <Component {...props} />
        : <Redirect to="/" />}
    />
  )
}

export default OnlyAnonymousRoute
