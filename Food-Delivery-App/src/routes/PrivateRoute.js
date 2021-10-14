 import React from "react"
import { Route, Redirect, useLocation } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const PrivateRoute = ({authorizedRole, component: Component, ...rest }) => {
  const { currentUser,role } = useAuth()
  const location = useLocation();

  return (
    <Route
      {...rest}
      render={props => {
        return currentUser && role === authorizedRole ? <Component {...props} /> : <Redirect to={{
          pathname: '/login',
          state: { from: location.pathname }
        }} />
      }}
    ></Route>
    )
}

export default PrivateRoute;