import { Square } from "./Square"

export function WinnerModal ({winner, resetGame}){
  // Si hay ganador retorna el elemento WinnerModal.
 if(winner ===null) return null
  return (
    <section className='winner'>
      <div className='text'>
          <h2>{
            winner===false
            ? "Empate"
            : "Ganó" 
          }</h2>
          <header className='win'>
            {/* aqui se utiliza el operador de fusio nula (??) para que si exista el elemento winner se renderice el Square. */}
            {winner && <Square>{winner}</Square>}
          </header>
          <footer>
            <button onClick={resetGame}>Empezar de nuevo</button>
          </footer>
      </div>
    </section>
  )
}