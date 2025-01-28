import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../utils/fetchAPI";

interface LoginPageProps {
    onLogin: () => void;
  }

const LoginPage:React.FC<LoginPageProps> = ({onLogin}) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await loginUser(name, email);
            onLogin()
            navigate("/search");
        } catch (err) {
            setError("Invalid login. Please check your credentials.");
        }
    };


    return (
        <div>
            <h1>Welcome to Fetch's Dog Search application. Find the dog breed you have always been looking for</h1>
            <form onSubmit={handleLogin}>
                <label htmlFor="">Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} required />
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <button type="submit" style={{ marginTop: "1rem" }}>
                    Login
                </button>
            </form>
        </div>
    )
}

export default LoginPage