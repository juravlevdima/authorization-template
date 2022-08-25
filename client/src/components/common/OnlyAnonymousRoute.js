import React from "react"
import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

// const OnlyAnonymousRoute = ({ component: Component, ...rest }) => {
//   const { isAuth } = useSelector((s) => s.auth)
//   return (
//     <Route
//       {...rest}
//       render={(props) => !isAuth
//         ? <Component {...props} />
//         : <Redirect to="/" />}
//     />
//   )
// }

const OnlyAnonymousRoute = ({ children }) => {
  const { isAuth } = useSelector((s) => s.auth)
  return !isAuth ? children : <Navigate to="/" replace />
}

export default OnlyAnonymousRoute
