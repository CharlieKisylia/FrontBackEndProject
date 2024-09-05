import React, { useState } from 'react';

const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);

    const handleClick = (index) => {
        const newBoard = [...board];
        if (!newBoard[index]) {
            newBoard[index] = xIsNext ? 'X' : 'O';
            setXIsNext(!xIsNext);
            setBoard(newBoard);
        }
    };

    const renderSquare = (index) => {
        return (
            <button className="square" onClick={() => handleClick(index)}>
                {board[index]}
            </button>
        );
    };

    return (
        <div>
            <h2>Tic-Tac-Toe</h2>
            <div className="board">
                {[...Array(9)].map((_, i) => renderSquare(i))}
            </div>
        </div>
    );
};

export default TicTacToe;
