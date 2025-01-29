import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../utils/fetchAPI";
import { motion } from "framer-motion";
import '../styles/LoginPage.css'

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
        <div className='login-container'>
            <motion.h1 initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className='login-title'>
                    Welcome to Fetch's Dog Search application. Find the dog breed you have always been looking for
                    </motion.h1>
            <motion.form 
            className='login-form'
            initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }} onSubmit={handleLogin}>
                <label htmlFor="name">Name</label>
                <input id='name' type="text" value={name} onChange={e => setName(e.target.value)} required />
                <label htmlFor='email'>Email:</label>
                <input
                id='email'
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <button type="submit" >
                    Login
                </button>
            </motion.form>
            {error && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="error-message"
                >
                    {error}
                </motion.p>
            )}
        </div>
    )
}

export default LoginPage