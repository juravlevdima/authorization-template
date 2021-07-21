import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ component: Component, roles: accessRoles, ...rest }) => {
  const { isAuth } = useSelector((s) => s.auth)
  const { role } = useSelector((s) => s.auth.user)
  return (
    <Route
      {...rest}
      render={(props) => isAuth && accessRoles?.includes(role)
        ? <Component {...props} />
        : <Redirect to="/" />}
    />
  )
}

export default PrivateRoute
