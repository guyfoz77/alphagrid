function Tile(letter, row, col, willContainLetter) {
  //tile constuctor
  return {
    letter: letter,
    row: row,
    col: col,
    willContainLetter: willContainLetter,
    active: false,
  }
}
export function getBoard(boardRaw) {
  //this function converts each letter in the board into an object
  console.log(boardRaw)
  const newBoard = []
  for (let i = 0; i < boardRaw.solution.length; i++) {
    const newRow = []
    for (let j = 0; j < boardRaw.solution[i].length; j++) {
      //buildrow
      let willContainLetter = false
      if (boardRaw.solution[i][j]) {
        willContainLetter = true
      }
      newRow.push(new Tile(boardRaw.start[i][j], i, j, willContainLetter))
    }
    newBoard.push(newRow)
  }
  const getSpareLetters = () => {
    const spareLetters = []
    for (let i = 0; i < boardRaw.solution.length; i++) {
      for (let j = 0; j < boardRaw.solution[i].length; j++) {
        if (newBoard[i][j].letter !== boardRaw.solution[i][j]) {
          spareLetters.push(boardRaw.solution[i][j])
        }
      }
    }
    return spareLetters
  }
  return {
    currentBoard: newBoard,
    solution: boardRaw.solution,
    getSpareLetters: getSpareLetters,
  }
}
