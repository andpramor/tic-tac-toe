import { WINNER_COMBOS } from '../constants.js';

export const checkWinner = (boardToCheck) => {
    //Comprobamos si se da uno de los combos ganadores
    for (const combo of WINNER_COMBOS) {
        const [a, b, c] = combo;
        //Para cada combo de posiciones ganadoras, compruebo primero si en la primera posición hay un valor y si es el mismo en las tres posiciones
        if (
            boardToCheck[a] &&
            boardToCheck[a] === boardToCheck[b] &&
            boardToCheck[a] === boardToCheck[c]
        ) {
            return boardToCheck[a];
        }
    }
    //Si no hay ganador
    return null;
};

export const checkEndGame = (boardToCheck) => {
    return !boardToCheck.includes(null);
};
