import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

// const PrivateRoute = ({ element: Component, roles: accessRoles, ...rest }) => {
//   const { isAuth } = useSelector((s) => s.auth)
//   const { role } = useSelector((s) => s.auth.user)
//   return (
//     <Route
//       {...rest}
//       render={(props) => isAuth && accessRoles?.includes(role)
//         ? <Component {...props} />
//         : <Navigate to="/" />}
//     />
//   )
// }


const PrivateRoute = ({ children, roles: accessRoles }) => {
  const { isAuth } = useSelector((s) => s.auth)
  const { role } = useSelector((s) => s.auth.user)
  return (
    isAuth && accessRoles?.includes(role)
      ? children
      : <Navigate to="/" replace />
  )
}

export default PrivateRoute
