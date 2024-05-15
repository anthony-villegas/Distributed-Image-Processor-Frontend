import { createContext, useState, useEffect } from "react"
import * as auth from "../auth"

const AuthContext = createContext()

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [jwt, setJwt] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const getSessionContext = async () => {
    try {
        const user = await auth.getCurrentUser()
        const session = await auth.getSession()
        const jwt = session.getIdToken().getJwtToken()
        setUser(user)
        setJwt(jwt)
        setIsLoggedIn(true)
    } catch (err) {
        // not logged in
        console.log(err)
        setUser(null)
        setJwt(null)
        setIsLoggedIn(false)
    }
  }

  useEffect(() => {
    getSessionContext()
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false))
  }, [])

  const signIn = async (username, password) => {
    await auth.signIn(username, password)
    await getCurrentUser()
  }
  const signOut = async () => {
    await auth.signOut()
    setUser(null)
    setJwt(null)
  }

  const authValue = {
    user,
    jwt,
    isLoggedIn,
    isLoading,
    signIn,
    signOut,
  }

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext }