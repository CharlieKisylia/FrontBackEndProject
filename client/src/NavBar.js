import React from 'react';
import './css/NavBar.css'

const NavBar = ({ onGameChange }) => {
  return (
    <div className="navbar">
      <button onClick={() => onGameChange('RockPaperScissors')}>Rock Paper Scissors</button>
      <button onClick={() => onGameChange('TicTacToe')}>Tic Tac Toe</button>
    </div>
  );
};

export default NavBar;