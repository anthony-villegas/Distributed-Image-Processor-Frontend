import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import SignUpForm from "./components/SignUpForm"

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/signUp" component={<SignUpForm />} />
        </Routes>
    </Router>
  )
}

export default App