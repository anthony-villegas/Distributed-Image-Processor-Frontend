import { useState } from "react"
import { signUp } from "../auth.js"
import ConfirmSignUpForm from "./ConfirmSignUpForm.jsx"

const SignUpForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError("")

    try {
      await signUp(email, password)
      setSuccess(true)
      console.log("Signup succesful")
    } catch (err) {
      setError(err.message || "Signup failed")
      console.log("Signup failed", err)
    }
  }

  if (success) {
    return (
      <ConfirmSignUpForm email={email}/>
    )
  }

  return (
    <div>
      <h2>SignUp</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">SignUp</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  )
}

export default SignUpForm;