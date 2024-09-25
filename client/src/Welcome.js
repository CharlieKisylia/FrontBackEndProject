import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate to redirect
import NavBar from './NavBar';
import RockPaperScissors from './RockPaperScissors';
import TicTacToe from './TicTacToe';
import './css/Welcome.css';

const Welcome = () => {
  const { username } = useParams();
  const [selectedGame, setSelectedGame] = useState('RockPaperScissors');
  const navigate = useNavigate(); // Hook to navigate to different routes

  // Handle game change
  const handleGameChange = (game) => {
    setSelectedGame(game);
  };

  // Handle logout
  const handleLogout = () => {
    // Clear user session or authentication (this could vary based on your setup)
    // Example: remove token from localStorage or clear session
    localStorage.removeItem('userToken'); // Assuming you're using token-based authentication

    // Redirect to the home page
    navigate('/'); 
  };

  return (
    <>
      <div className="welcome-page">
        <div className="username-container">
          Hello {username} 
          <button className="logout-button" onClick={handleLogout}>Logout</button> {/* Logout button */}
        </div>
        <NavBar onGameChange={handleGameChange} />
        <div className="game-content">
          {selectedGame === 'RockPaperScissors' && <RockPaperScissors username={username} />}
          {selectedGame === 'TicTacToe' && <TicTacToe username={username} />}
        </div>
      </div>
    </>
  );
};

export default Welcome;
