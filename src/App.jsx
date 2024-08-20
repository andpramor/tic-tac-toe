import { useState } from 'react';
import confetti from 'canvas-confetti';

import { WinnerModal } from './components/WinnerModal.jsx';
import { Square } from './components/Square.jsx';
import { TURNS } from './constants.js';

import { checkWinner, checkEndGame } from './logic/board.js';

function App() {
    const [board, setBoard] = useState(() => {
        const boardFromLocalStorage = window.localStorage.getItem('board');
        return boardFromLocalStorage
            ? JSON.parse(boardFromLocalStorage)
            : Array(9).fill(null);
    });
    const [turn, setTurn] = useState(() => {
        const turnFromLocalStorage = window.localStorage.getItem('turn');
        return turnFromLocalStorage ?? TURNS.X;
    });
    const [winner, setWinner] = useState(null); //Null: partida en curso. False: empate.

    const updateBoard = (index) => {
        //Si la casilla ya está jugada, o hay un ganador, no hacemos nada:
        if (board[index] || winner) return;
        //Actualizamos el tablero copiando el que había y poniendo el valor del turno que acaba de jugar en el índice donde ha jugado
        const newBoard = [...board];
        newBoard[index] = turn; //x u o
        setBoard(newBoard);

        //Cambiamos el turno
        const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
        setTurn(newTurn);

        //Aquí guardo la partida:
        window.localStorage.setItem('board', JSON.stringify(newBoard));
        window.localStorage.setItem('turn', newTurn);

        //Revisamos si hay ganador
        const newWinner = checkWinner(newBoard);
        if (newWinner) {
            confetti();
            setWinner(newWinner);
        } else if (checkEndGame(newBoard)) {
            setWinner(false);
        }
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setTurn(TURNS.X);
        setWinner(null);
        window.localStorage.removeItem('board');
        window.localStorage.removeItem('turn');
    };

    return (
        <main className='board'>
            <h1>Tic Tac Toe</h1>
            <button onClick={resetGame}>Empezar de nuevo</button>
            <section className='game'>
                {board.map((_, index) => {
                    return (
                        <Square
                            key={index}
                            index={index}
                            updateBoard={updateBoard}
                        >
                            {board[index]}
                        </Square>
                    );
                })}
            </section>
            <section className='turn'>
                <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
                <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
            </section>
            <WinnerModal winner={winner} resetGame={resetGame} />
        </main>
    );
}

export default App;
