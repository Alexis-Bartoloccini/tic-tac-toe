
export const checkEndGame = (boardToCheck) => {
    // chequea si todos los elementos del array de square son diferentes a Null.
    for (let i = 0; i < boardToCheck.length; i++) {
     if ( boardToCheck[i] === null){
      return false
     } 
    }
    return true
   }