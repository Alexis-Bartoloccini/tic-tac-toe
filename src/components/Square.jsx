export const Square = ({children, updateBoard, isSelected, index}) => {



    const className= `square ${isSelected ? "is-selected" : ''}`
  // cada vez que se clickee en el Square se va a ejecutar la funcion handleClick, que ejecuta la funcion updateBoard para actualizar el tablero.
    const handleClick = () => {
      updateBoard(index)
    }
                return(
                        <div className= {className}
                        onClick={handleClick}>
                          {children}
                        </div>
  )}