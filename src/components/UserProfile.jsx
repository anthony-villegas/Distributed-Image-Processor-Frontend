import { useContext } from "react"
import { AuthContext } from "./AuthContext"

export default function UserProfile() {
  const { user, signOut } = useContext(AuthContext)

  return (
    <div>
      {user && (
        <div>
          <h2>User Profile</h2>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
      <button onClick={signOut}>Sign Out</button>
    </div>
  )
}