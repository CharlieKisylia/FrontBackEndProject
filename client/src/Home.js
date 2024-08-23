import React, { useState } from 'react';
import './App.css';
import { createAccount, loginUser } from './utils/restfulAPI'; // Import the function

const Home = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const handleCreateAccountSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
    
        try {
            const data = await createAccount(username, email, password);
            console.log(data);
            alert(data.message);
        } catch (error) {
            alert("An error occurred. Please try again.");
        }
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const data = await loginUser(loginUsername, loginPassword);
            console.log(data);
            alert(data.message);
        } catch (error) {
            alert("An error occurred. Please try again.");
        }
    };



    return (
        <div className="auth-container">
            <div className="create-account-container">
                <h2>Create Account</h2>
                <form onSubmit={handleCreateAccountSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password: </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Create Account</button>
                </form>
            </div>

            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleLoginSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input
                            type="text"
                            value={loginUsername}
                            onChange={(e) => setLoginUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input
                            type="password"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Home;
