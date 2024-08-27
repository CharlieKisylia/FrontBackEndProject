// src/Welcome.js
import React from 'react';
import { useParams } from 'react-router-dom';
import './css/Welcome.css';

const Welcome = () => {
    const { username } = useParams();

    return (
        <div className="welcome-container">
            <h1>Hello {username}</h1>
        </div>
    );
};

export default Welcome;