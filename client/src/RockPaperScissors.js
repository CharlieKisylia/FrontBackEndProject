import React, { useState } from 'react';
import { updateRecord } from './utils/restfulAPI';
import './css/rockPaperScissors.css'; 

const choices = ['rock', 'paper', 'scissors'];

const RockPaperScissors = ({ username }) => {
    const [userChoice, setUserChoice] = useState('');
    const [computerChoice, setComputerChoice] = useState('');
    const [result, setResult] = useState('');
    const [wins, setWins] = useState(0);
    const [losses, setLosses] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const getComputerChoice = () => {
        const randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
    };

    const determineWinner = (user, computer) => {
        if (user === computer) return 'draw';
        if (
            (user === 'rock' && computer === 'scissors') ||
            (user === 'paper' && computer === 'rock') ||
            (user === 'scissors' && computer === 'paper')
        ) {
            return 'win';
        }
        return 'lose';
    };

    const handlePlay = async (choice) => {
        setIsAnimating(true); // Start animation
        const computerChoice = getComputerChoice();
        const gameResult = determineWinner(choice, computerChoice);
        setUserChoice(choice);
        setComputerChoice(computerChoice);
        setResult(gameResult);
    
        if (gameResult === 'draw') {
            setIsAnimating(false); // Stop animation if draw
            return;
        }
    
        try {
            const { wins, losses } = await updateRecord(username, gameResult);
            setWins(wins);
            setLosses(losses);
        } catch (error) {
            console.error('Failed to update record:', error);
            alert('Failed to update record. Please check the console for details.');
        } finally {
            setIsAnimating(false); // Stop animation after processing
        }
    };
    
    return (
        <div className={`rps-game-container ${isAnimating ? 'animating' : ''}`}>
            <h2>Rock Paper Scissors</h2>
            <div className="choices-container">
                {choices.map(choice => (
                    <button 
                        key={choice} 
                        className={`choice-button ${choice}`} 
                        onClick={() => handlePlay(choice)}
                        disabled={isAnimating} // Disable buttons during animation
                    >
                        {choice}
                    </button>
                ))}
            </div>
            <div className="results-container">
                <p>Your choice: <span className="user-choice">{userChoice}</span></p>
                <p>Computer's choice: <span className="computer-choice">{computerChoice}</span></p>
                <p className={`result ${result}`}>Result: {result}</p>
                <p>Total Wins: {wins} | Total Losses: {losses}</p>
            </div>
        </div>
    );
};

export default RockPaperScissors;
