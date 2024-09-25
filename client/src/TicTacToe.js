import React, { useState, useEffect } from 'react';
import './css/TicTacToe.css';

const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);

    useEffect(() => {
        if (!xIsNext && !checkWinner(board)) {
            const aiMove = makeAiMove(board);
            if (aiMove !== null) {
                const newBoard = [...board];
                newBoard[aiMove] = 'O';
                setBoard(newBoard);
                setXIsNext(true);
            }
        }
    }, [xIsNext, board]);

    const handleClick = (index) => {
        if (checkWinner(board) || board[index]) {
            return; 
        }

        const newBoard = [...board];
        newBoard[index] = 'X';
        setBoard(newBoard);
        setXIsNext(false);
    };

    const checkWinner = (board) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];  // Returns 'X' or 'O'
            }
        }
        return null;
    };

    const makeAiMove = (board) => {
        let availableMoves = board
            .map((square, idx) => square === null ? idx : null)
            .filter(v => v !== null);
        if (availableMoves.length === 0) return null;
        return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    };

    // Function to reset the game
    const resetGame = () => {
        setBoard(Array(9).fill(null)); // Reset board
        setXIsNext(true); // X starts again
    };

    const renderSquare = (index) => {
        return (
            <button className="square" onClick={() => handleClick(index)}>
                {board[index]}
            </button>
        );
    };

    const renderRow = (rowIndex) => {
        return (
            <div className="row">
                {renderSquare(rowIndex * 3)}
                {renderSquare(rowIndex * 3 + 1)}
                {renderSquare(rowIndex * 3 + 2)}
            </div>
        );
    };

    const winner = checkWinner(board);
    return (
        <div>
            <h2>Tic-Tac-Toe</h2>
            {winner ? <p>{`Winner: ${winner}`}</p> : <p>{`Next Player: ${xIsNext ? 'X' : 'O'}`}</p>}
            <div className="board">
                {renderRow(0)}
                {renderRow(1)}
                {renderRow(2)}
            </div>
            {/* Add Play Again button */}
            <button className="play-again-button" onClick={resetGame}>Play Again</button>
        </div>
    );
};

export default TicTacToe;
