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
export function boardBuild(board) {
  //this function converts each letter in the board into an object
  const newBoard = []
  for (let i = 0; i < board.solution.length; i++) {
    const newRow = []
    for (let j = 0; j < board.solution[i].length; j++) {
      //buildrow
      let willContainLetter = false
      if (board.solution[i][j]) {
        willContainLetter = true
      }
      newRow.push(new Tile(board.start[i][j], i, j, willContainLetter))
    }
    newBoard.push(newRow)
  }
  return newBoard
}
