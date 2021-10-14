import React, { useContext, useState, useEffect } from "react"
import axios from "axios"
import { auth } from "../firebase/firebase"
import Loader from "../components/common/Loader"

const AuthContext = React.createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState()
  const [role, setRole] = useState('')
  const [loading, setLoading] = useState(true)

  const signup = (email, password, displayName, role) => {
    const API_URL = process.env.REACT_APP_API_URL;
    return axios.post(API_URL+"/users",{
      email,
      password,
      displayName,
      role
    })
  }

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
  }

  const logout = () => {
    setRole('')
    return auth.signOut()
  }

  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email)
  }

  const  updateEmail = (email) => {
    return currentUser.updateEmail(email)
  }

  const updatePassword = (password) => {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      if (user) {
        user.getIdTokenResult()
          .then((idTokenResult) => {
            setRole(idTokenResult?.claims?.role)
          })
          .catch((error) => {
            console.log(error);
          });
      }
      else{
        setRole('')
      }
      setLoading(false)
    })

    return  unsubscribe
  }, [])

  const value = {
    currentUser,
    auth,
    role,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {loading? <Loader wrapperCLass="loader-wrapper" loaderClass="loader"/>:children}
    </AuthContext.Provider>
  )
}