// src/Welcome.js
import React from 'react';
import { useParams } from 'react-router-dom';
import './css/Welcome.css';
import RockPaperScissors from './RockPaperScissors';

const Welcome = () => {
    const { username } = useParams();

    return (
        <div className="welcome-container">
            <div className="username-container">
                <h1>Hello {username}</h1>
            </div>
            <div className="game-container">
                <RockPaperScissors username={username} />
            </div>
        </div>
        
    );
};

export default Welcome;