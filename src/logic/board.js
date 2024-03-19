import { WINNER_COMBOS } from "../constants"

export const checkWinnerFrom = (boardToCheck) => {
// Para cada uno de los combos de Winner_Combos hacer esta comparación, si todos son iguales entonces hay un ganador qe seria el elemento de la posicion "a"(boardToCheck[a]).
    for ( const combo of WINNER_COMBOS ) {
   
     const [a,b,c] = combo
     if (
       boardToCheck[a] &&
       boardToCheck[a] === boardToCheck[b] &&
       boardToCheck[b] === boardToCheck[c]
     ) {
     //si hay ganador, retorna el valor del ganador (x u o)
       return boardToCheck[a]
     }
     //si no hay ganador no hace nada (retorna null)
     }return null
   }