
//REFERENCE FROM SOURCE ON GITHUB: 
// https://github.com/theLoneCoder0/connect-four/tree/main 

import React, { useState } from "react";
import redToken from '../../src/images/dot_connect/red token.svg'
import blackToken from '../../src/images/dot_connect/black token.svg'

function Slot ({ ch, y, x }){
    return (
        <div className='slot' x={x} y={y}>
            {ch && (
                <img alt="dot" src={ch === 'X' ? redToken : blackToken} width='100%' height='100%' />
            )}
        </div>
    );
};

function DotConnect(){
    const [board, setBoard] = useState([
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '']
    ]);

    const [currPlayer, setCurrPlayer] = useState('X');
    const [oppPlayer, setOppPlayer] = useState('O');
    const [gameOver, setGameOver] = useState(false);


    const checkWin = (row, column, ch) => {
        try {
            if (board[row + 1][column] === ch) {
                if (board[row + 2][column] === ch) {
                    if (board[row + 3][column] === ch) {
                        return true;
                    }
                }
            }
        } catch (e) { console.log(e) }

        try {
            if (board[row + 1][column + 1] === ch) {
                if (board[row + 2][column + 2] === ch) {
                    if (board[row + 3][column + 3] === ch) {
                        return true;
                    }
                }
            }
        } catch (e) { console.log(e) }

        try {
            if (board[row + 1][column - 1] === ch) {
                if (board[row + 2][column - 2] === ch) {
                    if (board[row + 3][column - 3] === ch) {
                        return true;
                    }
                }
            }
        } catch (e) { console.log(e) }

        try {
            if (board[row][column + 1] === ch) {
                if (board[row][column + 2] === ch) {
                    if (board[row][column + 3] === ch) {
                        return true;
                    }
                }
            }
        } catch (e) { console.log(e) }

        try {
            if (board[row][column - 1] === ch) {
                if (board[row][column - 2] === ch) {
                    if (board[row][column - 3] === ch) {
                        return true;
                    }
                }
            }
        } catch (e) { console.log(e) }

        try {
            if (board[row - 1][column - 1] === ch) {
                if (board[row - 2][column - 2] === ch) {
                    if (board[row - 3][column - 3] === ch) {
                        return true;
                    }
                }
            }
        } catch (e) { console.log(e) }

        try {
            if (board[row - 1][column + 1] === ch) {
                if (board[row - 2][column + 2] === ch) {
                    if (board[row - 3][column + 3] === ch) {
                        return true;
                    }
                }
            }
        } catch (e) { console.log(e) }
        
    };

    const updateBoard = (row, column, ch) => {
        setBoard(prev => {
            const boardCopy = [...prev];
            boardCopy[row][column] = ch;
            return boardCopy;
        });
        return checkWin(row, column, ch);
    };


    const handleClick = (e) => {
        const column = e.target.getAttribute('x');
        let row = board.findIndex((rowArr, index) => {
            // Find the first row that is occupied or at the bottom of the board
            return (rowArr[column] !== '' || (index === board.length - 1));
        });
        // Only go up one row if the slot is NOT at the bottom
        if (row !== (board.length - 1)) row -= 1;
        if (board[row][column] !== '') row -= 1;



        setGameOver(updateBoard(row, column, currPlayer));


        if (!gameOver) {
            // Swap players
            const currPlayerCopy = currPlayer;
            setCurrPlayer(oppPlayer);
            setOppPlayer(currPlayerCopy);
        }

    };


    return (
        <header className="dotBG">
            {gameOver && (
                <h1>Game Over! {oppPlayer === 'X' ? 'Red' : 'Black'} Wins!</h1>
            )}
            <h2 id='playerDisplay'>{currPlayer === 'X' ? 'Red' : 'Black'} Move</h2>
            <div id='board'
                onClick={gameOver ? null : handleClick}
            >

                {board.map((row, i) => {
                    return row.map((ch, j) => <Slot ch={ch} y={i} x={j} />);
                })}
            </div>
        </header>
    );
}

export default DotConnect