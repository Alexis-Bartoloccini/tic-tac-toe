import './index.css'
import { useState } from 'react'
import confetti from 'canvas-confetti'
import { Square } from './components/Square'
import {TURNS} from "./constants.js"
import { checkWinnerFrom } from './logic/board.js'
import { WinnerModal } from './components/WinnerModal.jsx'
import { checkEndGame } from './logic/checkEndGame.js'

function App() {
 // se crea el tablero y en el principio se le da "null" a cada una de las 9 posiciones del arreglo. Tambien se chequea si hay algo guardado en el localStorage bajo el nombre de "board" y se lo carga para traer el tablero guardado
 
const [board, setBoard] = useState( () => {
const boardFromStorage= window.localStorage.getItem("board")
return boardFromStorage ? JSON.parse(boardFromStorage) :  Array(9).fill(null)})


// Se crea un estado para el turno y se chequea si hay algo guardado en el localStorage bajo el nombre de "turn" y se lo carga para traer el tablero guardado
const [turn,setTurn] = useState(()=>{
const turnFromStorage = window.localStorage.getItem("turn")
return turnFromStorage ? turnFromStorage :  TURNS.O})

 
const [winner, setWinner] = useState(null)

// Función para actualizar el tablero. 
const updateBoard = (index) => {  
  // si hay algo en la posición o hay un ganador entonces retorna.
  if (board[index]!== null || winner!== null) return
  // se guarda en newBoard el tablero, luego se actualiza el elemento donde se cliquea (index) y se utilizada el tablero completo con setBoard.
 const newBoard = [...board];
 newBoard[index] = turn;
 setBoard(newBoard)
//  si el turno es de la "o" ahora es de la "x" sino sigue siendo de la "o".Luego se llama la setTurn para actualizar el estado.
 const newTurn = turn === TURNS.O ? TURNS.X : TURNS.O;
 setTurn(newTurn)
 //guardar partida en local Storage.
 window.localStorage.setItem("board", JSON.stringify(newBoard))
 window.localStorage.setItem("turn", newTurn)
 //revisar si hay un ganador cada vez que un jugador hace una jugada (updateBoard)
 const newWinner = checkWinnerFrom(newBoard)
 if (newWinner) {
  confetti()
  setWinner(newWinner)
 } // checkeo para saber si el juego ha terminado.
 else if (checkEndGame(newBoard)){
  setWinner(false)
 }
}
// función que resetea el tablero a valores iniciales
const resetGame = () => {
  setBoard(Array(9).fill(null));
  setWinner(null);
  setTurn(TURNS.O)
  window.localStorage.removeItem("board")
  window.localStorage.removeItem("turn")
}

    return (
      <main className='board'>

          <h1>TIC-TAC-TOE</h1>
          <button onClick={resetGame}>Reset del juego</button>
          <section className='game'>
          {
            board.map( (square,index) => 
                  {
                    return( 
                      // aqui se le pasa el updateBoard como funcion no como la ejecución de la funcion (updateBoard()), de esta manera el componente Square tiene disponible la funcion para que este la use cuando sea necesaria (ver componente Square).
                      <Square
                      key={index}
                      index= {index}
                      updateBoard={updateBoard}
                      >{square}</Square>
                    )
                    })
              }
          </section>
          <section className='turn'>
{/* aquñi se le pasa como prop el "isSelected" como true o false según de quien sea el turno para que el componente Square lo tenga disponible y según el valalor de isSelected aplique o no la clase "is-selected" para mostrar resaltado el turno del jugador */}
           <Square isSelected = {turn===TURNS.O} > {TURNS.O}</Square>
           <Square isSelected = {turn===TURNS.X} > {TURNS.X}</Square>
          </section>
          <WinnerModal resetGame={resetGame} winner={winner}/>
          
      
      </main>
    )
  }

export default App
