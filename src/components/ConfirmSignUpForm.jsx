import { useState } from "react"
import { confirmSignUp, resendConfirmationCode } from "../auth"
import { useNavigate } from 'react-router-dom'

const ConfirmSignUpForm = ({email}) => {
  const navigate = useNavigate();
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [confirmSuccess, setConfirmSuccess] = useState(false)
  const [codeResent, setCodeResent] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  
  const handleSubmit = async (event) => {
    event.preventDefault()
    setError("")

    try {
      await confirmSignUp(email, code)
      setConfirmSuccess(true)
      setSuccessMessage("Signup confirmation succeeded")
      console.log("Signup confirmation succeeded")
      navigate('/sign-in');
    } catch (err) {
      setError(err.message)
      console.log("Signup confirmation failed:", err)
    }
  }

  const handleResendConfirmationCode = async (event) => {
    event.preventDefault()

    try {
      await resendConfirmationCode(email)
      setCodeResent(true)
      setTimeout(() => {
        setCodeResent(false); 
      }, 3000);
      console.log("Code resend succeeded")
    } catch(err) {
      console.log("Code resend failed", err)
    }
  }

  if (confirmSuccess) {
    return (
      <div>
        <h2>Confirmation successful!</h2>
        <p>You can now log in with your credentials.</p>
      </div>
    )
  }

  return (
    <div>
      <h2>Confirm Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Confirmation code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button type="submit">Confirm</button>
      </form>
      <button onClick={handleResendConfirmationCode}>Resend</button>
      {successMessage && <p>{successMessage}</p>}
      {codeResent && <p>Your confirmation code has been resent</p>}
      {error && <p>{error}</p>}
    </div>
  )
}

export default ConfirmSignUpForm