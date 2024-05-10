import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignUpForm from "./components/SignUpForm"
import LoginForm from "./components/LoginForm"
import { AuthProvider } from "./components/AuthContext"
import Dashboard from "./components/Dashboard"
import UserProfile from "./components/UserProfile"
import RouteGuard from "./components/RouteGuard"


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
          <Routes>
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/login" element={<LoginForm/>} />
            <Route path="/dashboard" element={<RouteGuard> <Dashboard/> </RouteGuard>} />
            <Route path="/profile" element={<RouteGuard> <UserProfile/> </RouteGuard>}/>
          </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App