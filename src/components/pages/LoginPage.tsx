import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../utils/fetchAPI";
import { motion } from "framer-motion";

interface LoginPageProps {
    onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("")


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
            <motion.h1 initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                style={{ textAlign: "center" }}>Welcome to Fetch's Dog Search application. Find the dog breed you have always been looking for</motion.h1>
            <motion.form initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }} onSubmit={handleLogin} style={{
                    display: "flex",
                    flexDirection: "column",
                    width: 200,
                    margin: "auto",
                }}>
                <label htmlFor="">Name</label>
                <input type="text" style={{ padding: "0.5rem", marginBottom: "0.5rem" }} value={name} onChange={e => setName(e.target.value)} required />
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={{ padding: "0.5rem", marginBottom: "0.5rem" }}
                    required
                />
                <button type="submit" style={{ marginTop: "1rem", padding: "0.5rem" }}>
                    Login
                </button>
            </motion.form>
            {error && (<p>{error}</p>)}
        </div>
    )
}

export default LoginPage