import { useState } from "react"
import { confirmSignUp } from "./auth"

export default function ConfirmSignUp() {
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError("")

    try {
      await confirmSignUp(email, code)
      setSuccess(true)
    } catch (err) {
      setError(err.message)
    }
  }

  if (success) {
    return (
      <div>
        <h2>Confirmation successful!</h2>
        <p>You can now log in with your credentials. Go rock that app!</p>
      </div>
    )
  }

  return (
    <div>
      <h2>Confirm Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Confirmation code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button type="submit">Confirm</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  )
}