import { useState } from "react"
import { AuthContext } from "./auth-context"

export function AuthProvider({ children }) {

  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("currentUser"))
  })

  const login = (identifier, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || []

    const foundUser = users.find(
      (u) =>
        (u.email === identifier || u.mobile === identifier) &&
        u.password === password
    )

    if (!foundUser) return null

    localStorage.setItem("currentUser", JSON.stringify(foundUser))
    setUser(foundUser)

    return foundUser
  }

  const logout = () => {
    localStorage.removeItem("currentUser")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}