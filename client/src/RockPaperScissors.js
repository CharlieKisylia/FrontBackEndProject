// RockPaperScissors.js
import React, { useState } from 'react';
import { updateRecord } from './utils/restfulAPI';

const choices = ['rock', 'paper', 'scissors'];

const RockPaperScissors = ({ username }) => {
    const [userChoice, setUserChoice] = useState('');
    const [computerChoice, setComputerChoice] = useState('');
    const [result, setResult] = useState('');
    const [wins, setWins] = useState(0);
    const [losses, setLosses] = useState(0);

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
        const computerChoice = getComputerChoice();
        const gameResult = determineWinner(choice, computerChoice);
        setUserChoice(choice);
        setComputerChoice(computerChoice);
        setResult(gameResult);
    

        if (gameResult === 'draw') {
            // Do nothing if it's a draw
            return;
        }
    
        try {
            const { wins, losses } = await updateRecord(username, gameResult);
            setWins(wins);
            setLosses(losses);
        } catch (error) {
            console.error('Failed to update record:', error);
            alert('Failed to update record. Please check the console for details.');
        }
    };
    

    return (
        <div className="rps-game-container">
            <h2>Rock Paper Scissors</h2>
            <div>
                {choices.map(choice => (
                    <button key={choice} onClick={() => handlePlay(choice)}>
                        {choice}
                    </button>
                ))}
            </div>
            <div>
                <p>Your choice: {userChoice}</p>
                <p>Computer's choice: {computerChoice}</p>
                <p>Result: {result}</p>
                <p>Total Wins: {wins} | Total Losses: {losses}</p>
            </div>
        </div>
    );
};

export default RockPaperScissors;
