import { useState, useContext } from "react"
import { AuthContext } from "./AuthContext";


const Dashboard = () => {
    const { user, jwt } = useContext(AuthContext)

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Jwt: {jwt}</p>
            <p>Username: {user.username}</p>
        </div>
    
    )
}

export default Dashboard