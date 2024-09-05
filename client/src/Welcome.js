import React, { useState } from 'react';
import NavBar from './NavBar'; // Import the NavBar component
import RockPaperScissors from './RockPaperScissors'; // Import the RockPaperScissors component
import TicTacToe from './TicTacToe'; // Import the TicTacToe component
import './css/Welcome.css'; // Import the CSS

const Welcome = () => {
  const [selectedGame, setSelectedGame] = useState('RockPaperScissors'); // Default to RockPaperScissors
  const username = 'charliek'; // Set username here or retrieve it from a higher-level component/context

  const handleGameChange = (game) => {
    setSelectedGame(game);
  };

  return (
    <>
      <div className="welcome-page">
        <div className="username-container">
            Hello {username}
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
